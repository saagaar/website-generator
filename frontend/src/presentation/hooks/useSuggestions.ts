'use client';
import { useState, useCallback } from 'react';
import type { Suggestion } from '@/domain/entities/Suggestion';

interface UseSuggestionsResult {
  suggestions: Suggestion[];
  isLoading: boolean;
  error: string | null;
  fetchSuggestions: (input: string) => Promise<void>;
  clearSuggestions: () => void;
}

export function useSuggestions(): UseSuggestionsResult {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  const fetchSuggestions = useCallback(async (input: string) => {
    if (!input.trim()) {
      clearSuggestions();
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const res = await fetch('/api/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      if (!res.ok) throw new Error('Failed to fetch suggestions');

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let buffer = '';
      let idCounter = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          const text = line.trim();
          if (text) {
            setSuggestions((prev) => [...prev, { id: String(++idCounter), text }]);
          }
        }
      }

      if (buffer.trim()) {
        setSuggestions((prev) => [
          ...prev,
          { id: String(++idCounter), text: buffer.trim() },
        ]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }, [clearSuggestions]);

  return { suggestions, isLoading, error, fetchSuggestions, clearSuggestions };
}
