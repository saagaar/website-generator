export type Validator = (value: string) => string | null;

export const fieldValidators: Record<string, Validator> = {
  email: v =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
      ? null
      : 'Please enter a valid email address',
};

export const isValidUrl = (v: string): boolean =>
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/.test(v.trim());
