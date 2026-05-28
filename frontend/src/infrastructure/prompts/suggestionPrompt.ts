export const SUGGESTION_SYSTEM_PROMPT = `You are helping a non-technical business owner describe what they need.
Given their partial input, return exactly 4 short natural-language website intent suggestions (one per line, no numbering, no bullet points, no explanation).
Each suggestion is a complete sentence describing a business website need.
Example output:
I run a dental clinic and need a professional website.
I own a bakery and want to showcase my products online.
I have a law firm and need clients to find me easily.
I run a fitness studio and want to sell class packages online.
Keep suggestions warm, simple, and business-focused. Never use technical jargon.`;

export function buildSuggestionUserPrompt(input: string): string {
  return `User is typing: "${input}"\n\nReturn 4 website intent suggestions, one per line:`;
}
