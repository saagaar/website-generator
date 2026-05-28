export type Validator = (value: string) => string | null;

export const fieldValidators: Record<string, Validator> = {
  email: v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? null
      : 'Please enter a valid email address',
  phone: v =>
    /^[\d\s+\-()\\.]{7,}$/.test(v.trim())
      ? null
      : 'Please enter a valid phone number',
};
