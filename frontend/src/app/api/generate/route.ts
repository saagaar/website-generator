import { NextRequest, NextResponse } from 'next/server';
import { OllamaWebsiteGenerator } from '@/infrastructure/ollama/OllamaWebsiteGenerator';
import type { BusinessInfo } from '@/domain/entities/BusinessInfo';

function withDefaults(partial: Partial<BusinessInfo>): BusinessInfo {
  return {
    name: partial.name ?? 'My Business',
    tagline: partial.tagline ?? '',
    industry: partial.industry ?? 'General',
    mission: partial.mission ?? '',
    vision: partial.vision ?? '',
    goals: partial.goals ?? '',
    story: partial.story ?? '',
    problemSolved: partial.problemSolved ?? '',
    uvp: partial.uvp ?? '',
    audience: partial.audience ?? '',
    address: partial.address ?? '',
    phone: partial.phone ?? '',
    email: partial.email ?? '',
    socialLinks: partial.socialLinks ?? {},
    team: partial.team ?? [],
    testimonials: partial.testimonials ?? [],
    accreditations: partial.accreditations ?? [],
    services: partial.services ?? [],
    galleryDescriptions: partial.galleryDescriptions ?? [],
    colorTheme: partial.colorTheme ?? 'Clean and professional',
    fontStyle: partial.fontStyle ?? 'Modern sans-serif',
    aesthetic: partial.aesthetic ?? 'Clean and minimal',
    pageType: partial.pageType ?? 'single-page',
    sections: partial.sections ?? ['hero', 'about', 'services', 'contact'],
  };
}

export async function POST(req: NextRequest) {
  let partial: Partial<BusinessInfo>;

  try {
    const body = await req.json();
    partial = body?.info ?? {};
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 });
  }

  if (!partial.name?.trim()) {
    return new NextResponse('Business name is required', { status: 400 });
  }

  const info = withDefaults(partial);
  const generator = new OllamaWebsiteGenerator();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of generator.generate(info)) {
          controller.enqueue(new TextEncoder().encode(chunk));
        }
      } catch (err) {
        console.error('Website generation error:', err);
      } finally {
        controller.close();
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  });
}
