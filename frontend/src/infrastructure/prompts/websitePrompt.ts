import type { BusinessInfo } from '@/domain/entities/BusinessInfo';

export const WEBSITE_SYSTEM_PROMPT = `You are an expert full-stack web developer and UI/UX designer.
Your task is to generate a complete, production-quality, self-contained single HTML file for a business website.

Rules you must follow without exception:
1. Output ONLY raw HTML. Do not include any explanation, commentary, markdown fences, or text before or after the HTML document.
2. The file must begin with <!DOCTYPE html> and end with </html>.
3. Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
4. All CSS beyond Tailwind must be embedded in a <style> tag inside <head>.
5. All JavaScript must be embedded in <script> tags before </body>.
6. The website must be visually polished, responsive on mobile and desktop, and look professionally designed.
7. Smooth scroll, sticky navigation, and subtle fade-in animations using IntersectionObserver are required.
8. Every section requested must be present and populated with the real content provided — never use lorem ipsum.
9. If multi-page is requested, implement it as a single HTML file using JavaScript hash routing.
10. For image placeholders use https://picsum.photos/seed/<slug>/1200/600 with a slug from the business name.`;

export function buildWebsiteUserPrompt(info: BusinessInfo): string {
  const formatList = (items: string[]) => items.length > 0 ? items.join(', ') : 'None provided';
  const formatTeam = info.team.map(m => `${m.name} (${m.role})`).join(', ') || 'None provided';
  const formatTestimonials = info.testimonials
    .map(t => `"${t.quote}" — ${t.client}`)
    .join('\n') || 'None provided';
  const formatServices = info.services
    .map(s => `${s.name}: ${s.description}`)
    .join('\n') || 'None provided';
  const formatSocials = Object.entries(info.socialLinks)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ') || 'None provided';

  return `Generate a complete business website for the following business. Use every detail provided.

=== BUSINESS IDENTITY ===
Name: ${info.name}
Tagline: ${info.tagline}
Industry: ${info.industry}

=== MISSION & VISION ===
Mission: ${info.mission}
Vision: ${info.vision}
Goals: ${info.goals}

=== STORY & VALUE ===
Background: ${info.story}
Problem Solved: ${info.problemSolved}
Unique Value Proposition: ${info.uvp}

=== TARGET AUDIENCE ===
${info.audience}

=== CONTACT & SOCIAL ===
Address: ${info.address}
Phone: ${info.phone}
Email: ${info.email}
Social Media: ${formatSocials}

=== TEAM ===
${formatTeam}

=== TESTIMONIALS ===
${formatTestimonials}

=== ACCREDITATIONS ===
${formatList(info.accreditations)}

=== SERVICES / PRODUCTS ===
${formatServices}

=== GALLERY ===
${formatList(info.galleryDescriptions)}

=== DESIGN PREFERENCES ===
Color Theme: ${info.colorTheme}
Font Style: ${info.fontStyle}
Design Aesthetic: ${info.aesthetic}

=== TECHNICAL PREFERENCES ===
Page Structure: ${info.pageType}
Sections to Include: ${formatList(info.sections)}

Now output the complete HTML file. Begin immediately with <!DOCTYPE html>.`;
}
