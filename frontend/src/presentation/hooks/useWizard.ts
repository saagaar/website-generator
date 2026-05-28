'use client';
import { useState, useEffect, useCallback } from 'react';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';
import { STATIC_QUESTIONS, type WizardQuestion } from '@/presentation/components/wizard/questions';
import { BUSINESS_CATEGORIES } from '@/presentation/components/wizard/categories';

export type RawAnswers = Record<string, string>;

interface WizardState {
  currentQuestion: WizardQuestion | null;
  rawAnswers: RawAnswers;
  answeredFields: string[];
  selectedCategory: string;
  staticIndex: number;
  isLoadingQuestion: boolean;
  isDone: boolean;
  error: string | null;
  editingField: string | null;
  preEditQuestion: WizardQuestion | null;
  preEditDone: boolean;
}

export interface UseWizardReturn {
  currentQuestion: WizardQuestion | null;
  rawAnswers: RawAnswers;
  answeredFields: string[];
  selectedCategory: string;
  isLoadingQuestion: boolean;
  isDone: boolean;
  error: string | null;
  editingField: string | null;
  selectCategory: (label: string) => void;
  submitAnswer: (value: string) => void;
  skip: () => void;
  editQuestion: (field: string) => void;
  generate: () => void;
}

// Pure state transform — no setState calls inside, safe to use inside setState callbacks
function advanceQueue(
  s: WizardState,
  rawAnswers: RawAnswers,
  answeredFields: string[],
  nextIndex: number
): WizardState {
  if (nextIndex < STATIC_QUESTIONS.length) {
    return {
      ...s,
      rawAnswers,
      answeredFields,
      staticIndex: nextIndex,
      currentQuestion: STATIC_QUESTIONS[nextIndex],
      isLoadingQuestion: false,
    };
  }
  // Static queue exhausted — signal Ollama fetch needed via isLoadingQuestion
  return {
    ...s,
    rawAnswers,
    answeredFields,
    currentQuestion: null,
    isLoadingQuestion: true,
    error: null,
  };
}

function parseAnswers(raw: RawAnswers, category: string): Partial<BusinessInfo> {
  const cat = BUSINESS_CATEGORIES.find(c => c.label === category);
  const result: Partial<BusinessInfo> = {};

  for (const [field, value] of Object.entries(raw)) {
    if (!value?.trim()) continue;

    if (field === 'services') {
      try {
        const parsed = JSON.parse(value);
        result.services = Array.isArray(parsed) ? parsed : [];
      } catch {
        result.services = value.split(/[,\n]+/).map(s => ({ name: s.trim(), description: '' })).filter(s => s.name);
      }
    } else if (field === 'socialLinks') {
      try {
        const parsed: { platform: string; url: string }[] = JSON.parse(value);
        const links: Record<string, string> = {};
        parsed.forEach(({ platform, url }) => { if (platform || url) links[platform || 'Website'] = url; });
        result.socialLinks = links;
      } catch {
        const links: Record<string, string> = {};
        value.split(/[,\n]+/).forEach(part => {
          const match = part.match(/^([^:@/\s]+)[:\s]+(.+)$/);
          if (match) links[match[1].trim()] = match[2].trim();
          else if (part.trim()) links['Website'] = part.trim();
        });
        result.socialLinks = links;
      }
    } else if (field === 'team') {
      try {
        const parsed = JSON.parse(value);
        result.team = Array.isArray(parsed) ? parsed : [];
      } catch {
        result.team = value.split(/[,\n]+/).map(part => {
          const [name, ...roleParts] = part.split(/\s*[—\-–]\s*/);
          return { name: name?.trim() ?? '', role: roleParts.join(' ').trim() };
        }).filter(m => m.name);
      }
    } else {
      (result as Record<string, unknown>)[field] = value;
    }
  }

  if (cat?.industry && !result.industry) result.industry = cat.industry;
  return result;
}

export function useWizard(onGenerate: (answers: Partial<BusinessInfo>) => void): UseWizardReturn {
  const [state, setState] = useState<WizardState>({
    currentQuestion: STATIC_QUESTIONS[0],
    rawAnswers: {},
    answeredFields: [],
    selectedCategory: '',
    staticIndex: 0,
    isLoadingQuestion: false,
    isDone: false,
    error: null,
    editingField: null,
    preEditQuestion: null,
    preEditDone: false,
  });

  // Ollama fetch is a side effect — triggered by isLoadingQuestion becoming true.
  // Using useEffect keeps it out of setState callbacks (fixing StrictMode double-invoke bug).
  useEffect(() => {
    if (!state.isLoadingQuestion) return;

    let cancelled = false;

    fetch('/api/next-question', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        answers: state.rawAnswers,
        answeredFields: state.answeredFields,
        category: state.selectedCategory,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Ollama unavailable');
        return res.json();
      })
      .then((result: { question: string; field: string } | { done: true }) => {
        if (cancelled) return;
        if ('done' in result && result.done) {
          setState(s => ({ ...s, isLoadingQuestion: false, isDone: true }));
        } else {
          const q = result as { question: string; field: string };
          setState(s => ({
            ...s,
            isLoadingQuestion: false,
            currentQuestion: { question: q.question, field: q.field },
          }));
        }
      })
      .catch(() => {
        if (cancelled) return;
        setState(s => ({ ...s, isLoadingQuestion: false, error: 'Could not connect to Ollama. Is it running?', isDone: true }));
      });

    return () => { cancelled = true; };
  }, [state.isLoadingQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectCategory = useCallback((label: string) => {
    const cat = BUSINESS_CATEGORIES.find(c => c.label === label);
    setState(s => ({
      ...s,
      selectedCategory: label,
      rawAnswers: cat?.industry ? { ...s.rawAnswers, industry: cat.industry } : s.rawAnswers,
    }));
  }, []);

  const submitAnswer = useCallback((value: string) => {
    setState(s => {
      if (!s.currentQuestion) return s;
      const field = s.currentQuestion.field;
      const newAnswers = { ...s.rawAnswers, [field]: value };
      const newFields = s.answeredFields.includes(field)
        ? s.answeredFields
        : [...s.answeredFields, field];

      if (s.editingField !== null) {
        return {
          ...s,
          rawAnswers: newAnswers,
          answeredFields: newFields,
          editingField: null,
          currentQuestion: s.preEditQuestion,
          preEditQuestion: null,
          isDone: s.preEditDone,
          preEditDone: false,
        };
      }

      const isStatic = s.staticIndex < STATIC_QUESTIONS.length;
      const nextIndex = isStatic ? s.staticIndex + 1 : s.staticIndex;
      return advanceQueue(s, newAnswers, newFields, nextIndex);
    });
  }, []);

  const skip = useCallback(() => {
    setState(s => {
      if (!s.currentQuestion) return s;
      if (s.editingField !== null) {
        return {
          ...s,
          editingField: null,
          currentQuestion: s.preEditQuestion,
          preEditQuestion: null,
          isDone: s.preEditDone,
          preEditDone: false,
        };
      }
      const isStatic = s.staticIndex < STATIC_QUESTIONS.length;
      const nextIndex = isStatic ? s.staticIndex + 1 : s.staticIndex;
      return advanceQueue(s, s.rawAnswers, s.answeredFields, nextIndex);
    });
  }, []);

  const editQuestion = useCallback((field: string) => {
    setState(s => {
      const staticQ = STATIC_QUESTIONS.find(q => q.field === field);
      const questionText = staticQ?.question ?? `Update your answer for: ${field}`;
      return {
        ...s,
        editingField: field,
        preEditQuestion: s.currentQuestion,
        preEditDone: s.isDone,
        currentQuestion: { field, question: questionText },
        isDone: false,
      };
    });
  }, []);

  const generate = useCallback(() => {
    onGenerate(parseAnswers(state.rawAnswers, state.selectedCategory));
  }, [state.rawAnswers, state.selectedCategory, onGenerate]);

  return {
    currentQuestion: state.currentQuestion,
    rawAnswers: state.rawAnswers,
    answeredFields: state.answeredFields,
    selectedCategory: state.selectedCategory,
    isLoadingQuestion: state.isLoadingQuestion,
    isDone: state.isDone,
    error: state.error,
    editingField: state.editingField,
    selectCategory,
    submitAnswer,
    skip,
    editQuestion,
    generate,
  };
}
