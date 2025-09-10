'use server';
/**
 * @fileOverview Generates an animation or image for a lesson scenario.
 *
 * - generateLessonAnimation - A function that generates a new image based on a scenario's outcome.
 * - GenerateLessonAnimationInput - The input type for the generateLessonAnimation function.
 * - GenerateLessonAnimationOutput - The return type for the generateLessonAnimation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonAnimationInputSchema = z.object({
  baseImage: z
    .string()
    .describe(
      "The base image of the scenario as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  animationUpdate: z.string().describe('A description of how the animation should change based on the answer.'),
});
export type GenerateLessonAnimationInput = z.infer<typeof GenerateLessonAnimationInputSchema>;

const GenerateLessonAnimationOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});
export type GenerateLessonAnimationOutput = z.infer<typeof GenerateLessonAnimationOutputSchema>;

export async function generateLessonAnimation(input: GenerateLessonAnimationInput): Promise<GenerateLessonAnimationOutput> {
  return generateLessonAnimationFlow(input);
}

const generateLessonAnimationFlow = ai.defineFlow(
  {
    name: 'generateLessonAnimationFlow',
    inputSchema: GenerateLessonAnimationInputSchema,
    outputSchema: GenerateLessonAnimationOutputSchema,
  },
  async ({baseImage, animationUpdate}) => {
    const {media} = await ai.generate({
        model: 'googleai/gemini-2.5-flash-image-preview',
        prompt: [
          {media: {url: baseImage}},
          {text: `Generate an updated image where this happens: "${animationUpdate}"`},
        ],
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      
      if (!media.url) {
        throw new Error('Image generation failed.');
      }

      return {
        imageUrl: media.url,
      };
  }
);
