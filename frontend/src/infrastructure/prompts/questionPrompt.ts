import type { RawAnswers } from '@/presentation/hooks/useWizard';

export function buildQuestionSystemPrompt(category: string): string {
  const businessType = category && category !== 'Other' ? `a ${category} business` : 'a business';
  return `You are helping the owner of ${businessType} build their website.
Your job is to ask ONE short, warm, conversational follow-up question to fill in missing information.
Return ONLY valid JSON on a single line — no explanation, no markdown, no prose.

Essential fields to cover (in priority order):
name, industry, mission, problemSolved, audience, uvp, tagline, colorTheme, aesthetic

JSON format when asking a question:
{"question": "...", "field": "fieldName"}

JSON format when all essential fields are covered:
{"done": true}

Rules:
- Never ask about a field already answered.
- Keep questions friendly and natural — not form-like.
- One question at a time, always.`;
}

export function buildQuestionUserPrompt(answers: RawAnswers, answeredFields: string[]): string {
  const answered = answeredFields.length > 0
    ? answeredFields.map(f => `${f}: ${JSON.stringify(answers[f])}`).join('\n')
    : 'None yet';

  return `Answers collected so far:\n${answered}\n\nWhat should I ask next? Return JSON only.`;
}
