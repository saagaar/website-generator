import type { BusinessInfo } from '../entities/BusinessInfo';

export interface IWebsiteGenerator {
  generate(info: BusinessInfo): AsyncIterable<string>;
}
