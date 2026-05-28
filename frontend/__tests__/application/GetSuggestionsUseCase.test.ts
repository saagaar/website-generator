import { GetSuggestionsUseCase } from '@/application/useCases/GetSuggestionsUseCase';
import type { ISuggestionRepository } from '@/domain/ports/ISuggestionRepository';
import type { Suggestion } from '@/domain/entities/Suggestion';

async function* mockStream(items: Suggestion[]): AsyncIterable<Suggestion> {
  for (const item of items) yield item;
}

const mockSuggestions: Suggestion[] = [
  { id: '1', text: 'I run a bakery' },
  { id: '2', text: 'I own a law firm' },
];

const mockRepo: ISuggestionRepository = {
  getSuggestions: jest.fn(() => mockStream(mockSuggestions)),
};

describe('GetSuggestionsUseCase', () => {
  beforeEach(() => jest.clearAllMocks());

  it('yields suggestions for valid input', async () => {
    const useCase = new GetSuggestionsUseCase(mockRepo);
    const results: Suggestion[] = [];
    for await (const s of useCase.execute('bakery')) {
      results.push(s);
    }
    expect(results).toHaveLength(2);
    expect(results[0].text).toBe('I run a bakery');
  });

  it('yields nothing for empty input', async () => {
    const useCase = new GetSuggestionsUseCase(mockRepo);
    const results: Suggestion[] = [];
    for await (const s of useCase.execute('')) results.push(s);
    expect(results).toHaveLength(0);
    expect(mockRepo.getSuggestions).not.toHaveBeenCalled();
  });

  it('yields nothing for whitespace-only input', async () => {
    const useCase = new GetSuggestionsUseCase(mockRepo);
    const results: Suggestion[] = [];
    for await (const s of useCase.execute('   ')) results.push(s);
    expect(results).toHaveLength(0);
  });

  it('delegates to repository for non-empty input', async () => {
    const useCase = new GetSuggestionsUseCase(mockRepo);
    for await (const _ of useCase.execute('cafe')) { /* drain */ }
    expect(mockRepo.getSuggestions).toHaveBeenCalledWith('cafe');
  });
});
