export interface TeamMember {
  name: string;
  role: string;
  imageDataUrl?: string;
}

export interface Testimonial {
  client: string;
  quote: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  industry: string;
  mission: string;
  vision: string;
  goals: string;
  story: string;
  problemSolved: string;
  uvp: string;
  audience: string;
  address: string;
  phone: string;
  email: string;
  socialLinks: Record<string, string>;
  team: TeamMember[];
  testimonials: Testimonial[];
  accreditations: string[];
  services: Service[];
  galleryDescriptions: string[];
  colorTheme: string;
  fontStyle: string;
  aesthetic: string;
  pageType: 'single-page' | 'multi-page';
  sections: string[];
}
