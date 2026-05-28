import type { Suggestion } from '../entities/Suggestion';

export interface ISuggestionRepository {
  getSuggestions(input: string): AsyncIterable<Suggestion>;
}
