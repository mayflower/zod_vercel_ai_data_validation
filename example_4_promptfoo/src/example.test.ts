import {describe, it, expect, beforeAll} from 'vitest';
import * as promptfoo from 'promptfoo';
import dotenv from 'dotenv'

beforeAll(() => {
    dotenv.config()
})
describe('Promptfoo Test Suite', () => {
    it('should pass when strings are semantically similar', async () => {
        const expected = 'The quick brown fox';
        const output = 'A fast brown fox';
        const threshold = 0.8;
        const response = await promptfoo.assertions.matchesSimilarity(expected, output, threshold);

        expect(response.pass).toBeTruthy();
    });

    it('should fail when strings are not semantically similar', async () => {
        const expected = 'The quick brown fox';
        const output = 'The weather is nice today';
        const threshold = 0.8;
        const response = await promptfoo.assertions.matchesSimilarity(expected, output, threshold);

        expect(response.pass).toBeFalsy();
    });

    it('should fail when strings are not semantically similar with negative threshold', async () => {
        const expected = 'The quick brown fox';
        const output = 'The weather is nice today';
        const threshold = -0.8;
        const response = await promptfoo.assertions.matchesSimilarity(expected, output, threshold);

        expect(response.pass).toBeTruthy();
    });
});