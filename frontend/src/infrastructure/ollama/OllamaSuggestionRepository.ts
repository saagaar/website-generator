import type { ISuggestionRepository } from '@/domain/ports/ISuggestionRepository';
import type { Suggestion } from '@/domain/entities/Suggestion';
import { streamOllamaChat } from './OllamaClient';
import {
  SUGGESTION_SYSTEM_PROMPT,
  buildSuggestionUserPrompt,
} from '@/infrastructure/prompts/suggestionPrompt';

const MODEL = 'llama3.2';

export class OllamaSuggestionRepository implements ISuggestionRepository {
  async *getSuggestions(input: string): AsyncIterable<Suggestion> {
    let buffer = '';
    let idCounter = 0;

    for await (const chunk of streamOllamaChat(
      MODEL,
      [
        { role: 'system', content: SUGGESTION_SYSTEM_PROMPT },
        { role: 'user', content: buildSuggestionUserPrompt(input) },
      ],
      { num_predict: 256, temperature: 0.7 }
    )) {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        const text = line.trim();
        if (text) {
          yield { id: String(++idCounter), text };
        }
      }
    }

    if (buffer.trim()) {
      yield { id: String(++idCounter), text: buffer.trim() };
    }
  }
}
