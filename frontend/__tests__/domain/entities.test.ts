import type { Suggestion } from '@/domain/entities/Suggestion';
import type { GeneratedWebsite } from '@/domain/entities/GeneratedWebsite';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';

describe('Domain entities', () => {
  it('Suggestion has id and text', () => {
    const s: Suggestion = { id: '1', text: 'I run a bakery' };
    expect(s.id).toBe('1');
    expect(s.text).toBe('I run a bakery');
  });

  it('GeneratedWebsite has html, generatedAt and businessName', () => {
    const w: GeneratedWebsite = { html: '<html></html>', generatedAt: new Date(), businessName: 'Test Co' };
    expect(w.html).toContain('<html>');
    expect(w.businessName).toBe('Test Co');
    expect(w.generatedAt).toBeInstanceOf(Date);
  });

  it('BusinessInfo pageType is narrowed to single-page | multi-page', () => {
    const b = { pageType: 'single-page' } as Partial<BusinessInfo>;
    expect(['single-page', 'multi-page']).toContain(b.pageType);
  });
});
