import { validateBusinessInfo } from '@/application/validators/BusinessInfoValidator';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';

const validInfo: BusinessInfo = {
  name: 'Acme Bakery', tagline: 'Fresh daily', industry: 'Food & Beverage',
  mission: 'Bake the best bread', vision: 'Local favourite', goals: 'Expand',
  story: 'Started in 2010', problemSolved: 'Fresh bread access', uvp: 'Sourdough specialists',
  audience: 'Local families', address: '1 Main St', phone: '0400 000 000',
  email: 'hello@acme.com', socialLinks: {}, team: [], testimonials: [],
  accreditations: [], services: [], galleryDescriptions: [],
  colorTheme: 'warm', fontStyle: 'serif', aesthetic: 'minimal',
  pageType: 'single-page', sections: ['hero', 'about', 'contact'],
};

describe('validateBusinessInfo', () => {
  it('returns no errors for valid info', () => {
    expect(validateBusinessInfo(validInfo)).toHaveLength(0);
  });

  it('returns error when name is missing', () => {
    const errors = validateBusinessInfo({ ...validInfo, name: '' });
    expect(errors).toContain('Business name is required');
  });

  it('returns error when name is whitespace only', () => {
    const errors = validateBusinessInfo({ ...validInfo, name: '   ' });
    expect(errors).toContain('Business name is required');
  });

  it('returns error when industry is missing', () => {
    const errors = validateBusinessInfo({ ...validInfo, industry: '' });
    expect(errors).toContain('Industry is required');
  });

  it('returns error when mission is missing', () => {
    const errors = validateBusinessInfo({ ...validInfo, mission: '' });
    expect(errors).toContain('Mission statement is required');
  });

  it('returns error when email is missing', () => {
    const errors = validateBusinessInfo({ ...validInfo, email: '' });
    expect(errors).toContain('Email is required');
  });

  it('returns error for invalid email format', () => {
    const errors = validateBusinessInfo({ ...validInfo, email: 'not-an-email' });
    expect(errors).toContain('Email address is invalid');
  });

  it('returns multiple errors when multiple fields are missing', () => {
    const errors = validateBusinessInfo({ ...validInfo, name: '', industry: '', email: '' });
    expect(errors.length).toBeGreaterThanOrEqual(3);
  });
});
