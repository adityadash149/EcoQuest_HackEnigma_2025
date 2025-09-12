
'use server';
/**
 * @fileOverview Finds environmental clubs and centers near a specified location.
 * 
 * - findNearbyNgos - A function that returns a list of organizations near a location.
 * - FindNearbyNgosInput - The input type for the findNearbyNgos function.
 * - FindNearbyNgosOutput - The return type for the findNearbyNgos function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const FindNearbyNgosInputSchema = z.object({
  location: z.string().describe('The city, zip code, or "latitude,longitude" to search for NGOs.'),
});
export type FindNearbyNgosInput = z.infer<typeof FindNearbyNgosInputSchema>;

const NgoSchema = z.object({
    name: z.string().describe('The name of the organization.'),
    address: z.string().describe('The city and state of the organization.'),
    description: z.string().describe('A brief description of the organization and its mission.'),
});

const FindNearbyNgosOutputSchema = z.object({
  ngos: z.array(NgoSchema).describe('An array of environmental clubs or centers found near the location.'),
});
export type FindNearbyNgosOutput = z.infer<typeof FindNearbyNgosOutputSchema>;


export async function findNearbyNgos(input: FindNearbyNgosInput): Promise<FindNearbyNgosOutput> {
  return findNearbyNgosFlow(input);
}

const findNearbyNgosPrompt = ai.definePrompt({
    name: 'findNearbyNgosPrompt',
    input: { schema: FindNearbyNgosInputSchema },
    output: { schema: FindNearbyNgosOutputSchema },
    prompt: `You are an expert at finding local organizations. The user wants to find environmental exhibition centers, environmental clubs, or Earth clubs near them.

    Find 3-5 real organizations near the following location: {{{location}}}.
    
    The location may be provided as a city name, zip code, or as latitude and longitude coordinates.
    
    For each organization, provide the name, the city and state for its address, and a brief description of their work. Do not provide a street address.
    `,
});

const findNearbyNgosFlow = ai.defineFlow(
  {
    name: 'findNearbyNgosFlow',
    inputSchema: FindNearbyNgosInputSchema,
    outputSchema: FindNearbyNgosOutputSchema,
  },
  async (input) => {
    const { output } = await findNearbyNgosPrompt(input);
    return output!;
  }
);
