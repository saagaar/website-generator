'use client';
import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import PillButton from '@/presentation/components/ui/PillButton';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

export default function GeneratePage() {
  const [html, setHtml] = useState('');
  const [isStreaming, setIsStreaming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const raw = sessionStorage.getItem('wizardAnswers');
    if (!raw) {
      setError('No answers found. Please go back and complete the wizard.');
      setIsStreaming(false);
      return;
    }

    let info: unknown;
    try {
      info = JSON.parse(raw);
    } catch {
      setError('Could not read your answers. Please try again.');
      setIsStreaming(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ info }),
        });

        if (!res.ok) {
          const msg = await res.text();
          setError(msg || 'Generation failed. Please try again.');
          setIsStreaming(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) { setError('No response from server.'); setIsStreaming(false); return; }

        const decoder = new TextDecoder();
        let accumulated = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setHtml(accumulated);
        }
        setIsStreaming(false);
      } catch {
        setError('Something went wrong. Is Ollama running?');
        setIsStreaming(false);
      }
    })();
  }, []);

  if (error) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', px: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 400, mb: 2, color: 'error.main' }}>{error}</Typography>
        <PillButton variant="outlined" color="primary" href="/">← Back to Generator</PillButton>
      </Box>
    );
  }

  if (isStreaming && !html) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <CircularProgress size={40} thickness={3} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 300, mb: 1 }}>Building your website…</Typography>
          <Typography variant="body2" color="text.secondary">This usually takes 20–60 seconds.</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Toolbar */}
      <Box
        sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: { xs: 2, md: 4 }, py: 1.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'sticky', top: 0, zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography variant="body2" sx={{ fontWeight: 500, color: 'text.primary' }}>
            {isStreaming ? 'Generating…' : 'Your website is ready'}
          </Typography>
          {isStreaming && <CircularProgress size={14} thickness={4} sx={{ ml: 1 }} />}
        </Box>
        <PillButton variant="outlined" color="primary" href="/" size="small">
          ← Start Over
        </PillButton>
      </Box>

      {/* Preview iframe */}
      <Box sx={{ flex: 1, bgcolor: '#fff' }}>
        <iframe
          srcDoc={html}
          title="Generated Website Preview"
          style={{ width: '100%', height: 'calc(100vh - 57px)', border: 'none', display: 'block' }}
          sandbox="allow-scripts allow-same-origin"
        />
      </Box>
    </Box>
  );
}
