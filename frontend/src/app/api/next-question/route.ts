import { NextRequest, NextResponse } from 'next/server';
import { streamOllamaChat } from '@/infrastructure/ollama/OllamaClient';
import { buildQuestionSystemPrompt, buildQuestionUserPrompt } from '@/infrastructure/prompts/questionPrompt';
import type { RawAnswers } from '@/presentation/hooks/useWizard';

const MODEL = 'llama3.2';

export async function POST(req: NextRequest) {
  let answers: RawAnswers;
  let answeredFields: string[];
  let category: string;

  try {
    const body = await req.json();
    answers = body?.answers ?? {};
    answeredFields = body?.answeredFields ?? [];
    category = body?.category ?? '';
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  let fullResponse = '';
  try {
    for await (const chunk of streamOllamaChat(
      MODEL,
      [
        { role: 'system', content: buildQuestionSystemPrompt(category) },
        { role: 'user', content: buildQuestionUserPrompt(answers, answeredFields) },
      ],
      { num_predict: 128, temperature: 0.4 }
    )) {
      fullResponse += chunk;
    }
  } catch (err) {
    console.error('Ollama question error:', err);
    return new NextResponse('Ollama unavailable', { status: 502 });
  }

  const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return new NextResponse('Invalid response from model', { status: 500 });
  }

  try {
    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch {
    return new NextResponse('Failed to parse model response', { status: 500 });
  }
}
