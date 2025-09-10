
'use server';
/**
 * @fileOverview A flow for evaluating user-generated eco-slogans.
 *
 * - evaluateSlogan - A function that evaluates a slogan based on a topic.
 * - EvaluateSloganInput - The input type for the evaluateSlogan function.
 * - EvaluateSloganOutput - The return type for the evaluateSlogan function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluateSloganInputSchema = z.object({
  topic: z.string().describe('The environmental topic for the slogan.'),
  slogan: z.string().describe('The user-generated slogan to evaluate.'),
});
export type EvaluateSloganInput = z.infer<typeof EvaluateSloganInputSchema>;

const EvaluateSloganOutputSchema = z.object({
  feedback: z.string().describe('Constructive feedback on the slogan, commenting on its creativity, relevance, and impact.'),
  score: z.number().min(0).max(10).describe('A score from 0 to 10 based on the quality of the slogan.'),
  isGoodSlogan: z.boolean().describe('Whether the slogan is considered a good and effective slogan.'),
});
export type EvaluateSloganOutput = z.infer<typeof EvaluateSloganOutputSchema>;


export async function evaluateSlogan(input: EvaluateSloganInput): Promise<EvaluateSloganOutput> {
  return evaluateSloganFlow(input);
}

const evaluateSloganPrompt = ai.definePrompt({
    name: 'evaluateSloganPrompt',
    input: { schema: EvaluateSloganInputSchema },
    output: { schema: EvaluateSloganOutputSchema },
    prompt: `You are an expert in marketing and environmental advocacy. Your task is to evaluate a user-generated slogan based on a specific environmental topic.

    Topic: {{{topic}}}
    Slogan: "{{{slogan}}}"
    
    Evaluate the slogan based on the following criteria:
    1.  **Relevance:** Does the slogan accurately relate to the topic?
    2.  **Creativity:** Is the slogan original and memorable?
    3.  **Impact:** Is the slogan powerful and likely to inspire action or thought?
    
    Provide constructive feedback and a score from 0 to 10. A score of 8 or higher means it is a good slogan.
    
    Example:
    Topic: Water Conservation
    Slogan: "Save water, save life."
    
    Feedback: "This is a classic and powerful slogan. It's direct, easy to remember, and clearly links water conservation to the fundamental value of life. While not highly original, its impact is undeniable. Great job!"
    Score: 8
    isGoodSlogan: true
    `,
});

const evaluateSloganFlow = ai.defineFlow(
  {
    name: 'evaluateSloganFlow',
    inputSchema: EvaluateSloganInputSchema,
    outputSchema: EvaluateSloganOutputSchema,
  },
  async (input) => {
    const { output } = await evaluateSloganPrompt(input);
    return output!;
  }
);
