export interface BusinessCategory {
  label: string;
  icon: string;
  industry: string;
}

export const BUSINESS_CATEGORIES: BusinessCategory[] = [
  { label: 'Restaurant',       icon: '🍽',  industry: 'Food & Beverage' },
  { label: 'Retail',           icon: '🛍',  industry: 'Retail' },
  { label: 'Healthcare',       icon: '🏥',  industry: 'Healthcare' },
  { label: 'Tech & SaaS',      icon: '💻',  industry: 'Technology' },
  { label: 'Beauty & Wellness',icon: '💅',  industry: 'Beauty & Wellness' },
  { label: 'Construction',     icon: '🏗',  industry: 'Construction' },
  { label: 'Education',        icon: '📚',  industry: 'Education' },
  { label: 'Real Estate',      icon: '🏡',  industry: 'Real Estate' },
  { label: 'Legal',            icon: '⚖️', industry: 'Legal Services' },
  { label: 'Creative',         icon: '🎨',  industry: 'Creative Services' },
  { label: 'Other',            icon: '➕',  industry: '' },
];
