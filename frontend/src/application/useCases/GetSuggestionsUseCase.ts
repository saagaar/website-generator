import type { ISuggestionRepository } from '@/domain/ports/ISuggestionRepository';
import type { Suggestion } from '@/domain/entities/Suggestion';

export class GetSuggestionsUseCase {
  constructor(private readonly repo: ISuggestionRepository) {}

  async *execute(input: string): AsyncIterable<Suggestion> {
    if (!input.trim()) return;
    yield* this.repo.getSuggestions(input);
  }
}
