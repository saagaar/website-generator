export interface WizardQuestion {
  field: string;
  question: string;
}

export const STATIC_QUESTIONS: WizardQuestion[] = [
  // Core identity
  { field: 'name',        question: "What's the name of your business?" },
  { field: 'story',       question: "In a sentence or two, what does your business do and who do you help?" },
  { field: 'services',    question: "What are your main products or services?" },
  { field: 'audience',    question: "Who is your ideal customer?" },

  // Contact & social
  { field: 'email',       question: "What's the best email address for customers to reach you?" },
  { field: 'phone',       question: "Do you have a phone number you'd like displayed on the site?" },
  { field: 'address',     question: "What's your business address or service area? (skip if fully online)" },
  { field: 'socialLinks', question: "Any social media profiles? (e.g. Instagram @mybiz, LinkedIn /company/mybiz)" },

  // Brand & design
  { field: 'colorTheme',  question: "Do you have brand colors in mind, or any color references you like?" },
  { field: 'aesthetic',   question: "How would you describe the look and feel you want? (e.g. clean and minimal, bold and energetic, warm and friendly)" },

  // Team
  { field: 'team',        question: "Would you like to feature your team? If yes, list names and roles (e.g. Sarah — CEO, Tom — Designer)" },

  // Open-ended
  { field: 'goals',       question: "Anything else you'd like on your website — specific pages, features, or content?" },
];
