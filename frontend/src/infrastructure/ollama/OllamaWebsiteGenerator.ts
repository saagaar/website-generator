import type { IWebsiteGenerator } from '@/domain/ports/IWebsiteGenerator';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';
import { streamOllamaChat } from './OllamaClient';
import { WEBSITE_SYSTEM_PROMPT, buildWebsiteUserPrompt } from '@/infrastructure/prompts/websitePrompt';

const MODEL = 'llama3.2';

export class OllamaWebsiteGenerator implements IWebsiteGenerator {
  async *generate(info: BusinessInfo): AsyncIterable<string> {
    yield* streamOllamaChat(
      MODEL,
      [
        { role: 'system', content: WEBSITE_SYSTEM_PROMPT },
        { role: 'user', content: buildWebsiteUserPrompt(info) },
      ],
      { num_predict: 8192, temperature: 0.3 }
    );
  }
}
