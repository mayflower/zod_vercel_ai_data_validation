import dotenv from 'dotenv'
import {generateObject} from "ai";
import {openai} from "@ai-sdk/openai";
import fs from "node:fs"
import {z} from "zod";
import TurndownService from "turndown";

dotenv.config()

const schema = z.object({
    title: z.string().min(1, "Title must be at least 1 character long"),
    summary: z.string().min(1, "Summary must be at least 10 character long."),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format YYYY-MM-DD"),
    authors: z.array(z.string().min(1, "Name of author must be at least 1 character long")),
})

async function main() {
    try {
        // HTML Datei einlesen
        const input = fs.readFileSync('./src/input.html', 'utf8');

        // HTML in Markdown umwandeln - spart Tokens und Zeit
        const markdown = (new TurndownService()).turndown(input);

        // Markdown und Schema an Sprachmodell übergeben, um ein Ergebnisobjekt zu erhalten
        const {object} = await generateObject({
            model: openai('gpt-4-turbo'),
            schema: schema,
            messages: [{
                role: 'system',
                content: 'You are a professional newspaper reader who is tasked with summarizing an article.'
            }, {
                role: 'user',
                content: markdown
            }],
            seed: 1234,
            temperature: 0
        })

        console.log(object)
    } catch(error) {
        console.log(error)
    }
}

main();