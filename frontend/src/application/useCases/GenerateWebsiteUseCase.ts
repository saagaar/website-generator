import type { IWebsiteGenerator } from '@/domain/ports/IWebsiteGenerator';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';
import { validateBusinessInfo } from '@/application/validators/BusinessInfoValidator';
import { DomainError } from '@/domain/errors/DomainError';

export class GenerateWebsiteUseCase {
  constructor(private readonly generator: IWebsiteGenerator) {}

  async *execute(info: BusinessInfo): AsyncIterable<string> {
    const errors = validateBusinessInfo(info);
    if (errors.length > 0) {
      throw new DomainError(errors.join('; '), 'VALIDATION_ERROR');
    }
    yield* this.generator.generate(info);
  }
}
