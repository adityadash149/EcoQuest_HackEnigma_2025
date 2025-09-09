'use server';
/**
 * @fileOverview AI-powered lesson scenario generator.
 *
 * - generateLessonScenarios - A function that generates lesson scenarios based on a high-level description.
 * - GenerateLessonScenariosInput - The input type for the generateLessonScenarios function.
 * - GenerateLessonScenariosOutput - The return type for the generateLessonScenarios function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonScenariosInputSchema = z.object({
  topic: z.string().describe('The topic of the environmental lesson.'),
  description: z.string().describe('A high-level description of the environmental issue.'),
  gradeLevel: z.string().describe('The grade level for the lesson (e.g., elementary, middle school, high school).'),
  numberOfScenarios: z.number().describe('The number of scenarios to generate.'),
});
export type GenerateLessonScenariosInput = z.infer<typeof GenerateLessonScenariosInputSchema>;

const ScenarioSchema = z.object({
  scenarioTitle: z.string().describe('The title of the scenario.'),
  scenarioDescription: z.string().describe('A description of the scenario.'),
  question: z.string().describe('A multiple-choice question related to the scenario.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  incorrectAnswers: z.array(z.string()).describe('An array of incorrect answers to the question.'),
  explanation: z.string().describe('An explanation of the correct answer and the consequences of incorrect answers.'),
  animationUpdate: z.string().describe('A description of how the animation should change based on the answer.'),
});

const GenerateLessonScenariosOutputSchema = z.object({
  scenarios: z.array(ScenarioSchema).describe('An array of generated lesson scenarios.'),
});
export type GenerateLessonScenariosOutput = z.infer<typeof GenerateLessonScenariosOutputSchema>;

export async function generateLessonScenarios(input: GenerateLessonScenariosInput): Promise<GenerateLessonScenariosOutput> {
  return generateLessonScenariosFlow(input);
}

const generateLessonScenariosPrompt = ai.definePrompt({
  name: 'generateLessonScenariosPrompt',
  input: {schema: GenerateLessonScenariosInputSchema},
  output: {schema: GenerateLessonScenariosOutputSchema},
  prompt: `You are an experienced environmental science teacher creating interactive lesson scenarios for students.

  Based on the topic, description, and grade level provided, generate multiple engaging scenarios with multiple-choice questions.
  Each scenario should have a clear description, a relevant question, a correct answer, a set of incorrect answers, an explanation of the correct answer,
  and a description of how the animation should update based on the student's answer.

  Topic: {{{topic}}}
  Description: {{{description}}}
  Grade Level: {{{gradeLevel}}}
  Number of Scenarios: {{{numberOfScenarios}}}

  Format the output as a JSON object with a 'scenarios' array. Each scenario object in the array should include:
  - scenarioTitle: A title for the scenario.
  - scenarioDescription: A detailed description of the scenario.
  - question: A multiple-choice question related to the scenario.
  - correctAnswer: The correct answer to the question.
  - incorrectAnswers: An array of incorrect answers.
  - explanation: An explanation of the correct answer and the consequences of incorrect answers.
  - animationUpdate: A description of how the animation should change based on the answer (e.g., fire reduces, pollution clears, tree grows).
  `,
});

const generateLessonScenariosFlow = ai.defineFlow(
  {
    name: 'generateLessonScenariosFlow',
    inputSchema: GenerateLessonScenariosInputSchema,
    outputSchema: GenerateLessonScenariosOutputSchema,
  },
  async input => {
    const {output} = await generateLessonScenariosPrompt(input);
    return output!;
  }
);
