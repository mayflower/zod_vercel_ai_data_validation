import dotenv from 'dotenv'
import {generateObject} from "ai";
import {openai} from "@ai-sdk/openai";
import fs from "node:fs"
import {z} from "zod";
import TurndownService from "turndown";
import {NodeSDK} from "@opentelemetry/sdk-node";
import {LangfuseExporter} from "langfuse-vercel";
import {getNodeAutoInstrumentations} from "@opentelemetry/auto-instrumentations-node";

dotenv.config()

const schema = z.object({
    title: z.string({
        description: "The headline of the article must be at least 1 character long"
    }),
    summary: z.string({
        description: "The summary of the article must be at least 100 words long and must contain all aspects of the article. Do not make any assumptions! I want the summary in german language."
    }),
    date: z.string({
        description: "The date of the article in Iso format (DD.MM.YYYY)",
    }),
    authors: z.array(z.string({
        description: "The name of the author of the article"
    })),
});

const sdk = new NodeSDK({
    traceExporter: new LangfuseExporter(),
    instrumentations: [getNodeAutoInstrumentations()],
})

sdk.start();

async function main() {
    try {
        // HTML Datei einlesen
        const input = fs.readFileSync('./src/input.html', 'utf8');

        // HTML in Markdown umwandeln - spart Tokens und Zeit
        const markdown = (new TurndownService()).turndown(input);

        // Markdown und Schema an Sprachmodell übergeben, um ein Ergebnisobjekt zu erhalten
        const {object} = await generateObject({
            // model: openai('gpt-4-turbo'),
            model: openai('gpt-4o'),
            schema: schema,
            messages: [{
                role: 'system',
                content: 'You are a professional newspaper reader who is tasked with summarizing an article. Do not make any assumptions!'
            }, {
                role: 'user',
                content: markdown
            }],
            seed: 1234,
            temperature: 0.1,
            experimental_telemetry: {
                isEnabled: true,
                functionId: "generateObject"
            }
        });

        console.log(object)

        await sdk.shutdown();
    } catch(error) {
        console.log(error)
    }
}

main();