import type { BusinessInfo } from '@/domain/entities/BusinessInfo';

export function validateBusinessInfo(info: Partial<BusinessInfo>): string[] {
  const errors: string[] = [];

  if (!info.name?.trim()) errors.push('Business name is required');
  if (!info.industry?.trim()) errors.push('Industry is required');
  if (!info.mission?.trim()) errors.push('Mission statement is required');
  if (!info.email?.trim()) errors.push('Email is required');

  if (info.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
    errors.push('Email address is invalid');
  }

  return errors;
}
