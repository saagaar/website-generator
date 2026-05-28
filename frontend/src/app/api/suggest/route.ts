import { NextRequest, NextResponse } from 'next/server';
import { GetSuggestionsUseCase } from '@/application/useCases/GetSuggestionsUseCase';
import { OllamaSuggestionRepository } from '@/infrastructure/ollama/OllamaSuggestionRepository';

export async function POST(req: NextRequest) {
  let input: string;

  try {
    const body = await req.json();
    input = body?.input;
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  if (!input?.trim()) {
    return new NextResponse('Missing input', { status: 400 });
  }

  const repo = new OllamaSuggestionRepository();
  const useCase = new GetSuggestionsUseCase(repo);

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const suggestion of useCase.execute(input)) {
          controller.enqueue(new TextEncoder().encode(suggestion.text + '\n'));
        }
      } catch (err) {
        console.error('Suggestion stream error:', err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
