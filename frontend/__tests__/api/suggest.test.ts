/**
 * @jest-environment node
 */
import { POST } from '@/app/api/suggest/route';
import { NextRequest } from 'next/server';

jest.mock('@/infrastructure/ollama/OllamaSuggestionRepository', () => ({
  OllamaSuggestionRepository: jest.fn().mockImplementation(() => ({
    getSuggestions: async function* () {
      yield { id: '1', text: 'I run a bakery and need a website' };
      yield { id: '2', text: 'I own a law firm' };
    },
  })),
}));

function makeRequest(body: unknown): NextRequest {
  return new NextRequest('http://localhost/api/suggest', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

describe('POST /api/suggest', () => {
  it('returns 400 when input is missing', async () => {
    const res = await POST(makeRequest({}));
    expect(res.status).toBe(400);
  });

  it('returns 400 when input is empty string', async () => {
    const res = await POST(makeRequest({ input: '' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 when input is whitespace only', async () => {
    const res = await POST(makeRequest({ input: '   ' }));
    expect(res.status).toBe(400);
  });

  it('returns 200 with streaming plain text for valid input', async () => {
    const res = await POST(makeRequest({ input: 'bakery' }));
    expect(res.status).toBe(200);
    expect(res.headers.get('Content-Type')).toContain('text/plain');
  });

  it('streams suggestions in the response body', async () => {
    const res = await POST(makeRequest({ input: 'bakery' }));
    const text = await res.text();
    expect(text).toContain('I run a bakery');
    expect(text).toContain('I own a law firm');
  });

  it('returns 400 for invalid JSON body', async () => {
    const req = new NextRequest('http://localhost/api/suggest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'not json',
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });
});
