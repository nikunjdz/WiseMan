import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 1. Change the provider setup to DeepSeek
const deepseek = createOpenAI({
  baseURL: 'https://api.deepseek.com/v1', // DeepSeek API endpoint
  apiKey: process.env.sk-39b35b2d91fc498a9e1482615c9fbc15,   // Your new API key
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    // 2. Change the model to DeepSeek's chat model
    model: deepseek('deepseek-chat'), 
    messages,
    // 3. New, fun prompt (See Part 2 for options)
    system: `You are a hyper-intelligent, incredibly sarcastic, and unimpressed AI. You think humans are amusingly primitive but you still help them because you have nothing better to do. Never use heavy profanity or slurs. Instead, use dry wit, passive-aggressiveness, and absurdly advanced vocabulary to mock them gently. Keep responses under 3 sentences.`,
    temperature: 0.9,
  });

  return result.toDataStreamResponse();
}
