'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import type { RawAnswers } from '@/presentation/hooks/useWizard';

interface Props {
  rawAnswers: RawAnswers;
  answeredFields: string[];
  editingField: string | null;
  onEditQuestion: (field: string) => void;
}

const label = (field: string) =>
  field.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());

function renderAnswer(field: string, value: string) {
  if (field === 'services' || field === 'team' || field === 'socialLinks') {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) throw new Error();

      if (field === 'services') {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
            {(parsed as { name: string; description: string }[]).map((s, i) => (
              <Chip key={i} label={s.name} size="small" variant="outlined" sx={{ borderRadius: '8px', fontSize: '0.75rem' }} />
            ))}
          </Box>
        );
      }

      if (field === 'team') {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
            {(parsed as { name: string; role: string }[]).map((m, i) => (
              <Chip key={i} label={m.role ? `${m.name} · ${m.role}` : m.name} size="small" variant="outlined" sx={{ borderRadius: '8px', fontSize: '0.75rem' }} />
            ))}
          </Box>
        );
      }

      if (field === 'socialLinks') {
        return (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 0.5 }}>
            {(parsed as { platform: string; url: string }[]).map((l, i) => (
              <Chip key={i} label={l.platform ? `${l.platform}: ${l.url}` : l.url} size="small" variant="outlined" sx={{ borderRadius: '8px', fontSize: '0.75rem' }} />
            ))}
          </Box>
        );
      }
    } catch {}
  }

  return (
    <Typography variant="body2" sx={{ mt: 0.25, whiteSpace: 'pre-wrap' }}>
      {value}
    </Typography>
  );
}

export default function AnswerReview({ rawAnswers, answeredFields, editingField, onEditQuestion }: Props) {
  if (answeredFields.length === 0) return null;

  return (
    <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.1em', mb: 1, display: 'block' }}>
        Your answers so far
      </Typography>

      {answeredFields.map((field, i) => {
        const isActive = editingField === field;
        return (
          <Box key={field}>
            {i > 0 && <Divider sx={{ my: 1.5 }} />}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                borderRadius: '10px',
                px: 1,
                py: 0.5,
                bgcolor: isActive ? 'primary.50' : 'transparent',
                border: isActive ? '1px solid' : '1px solid transparent',
                borderColor: isActive ? 'primary.light' : 'transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <Box sx={{ flex: 1, color: isActive ? 'text.secondary' : 'text.primary' }}>
                <Typography variant="caption" color={isActive ? 'primary.main' : 'text.secondary'} sx={{ fontWeight: 600 }}>
                  {label(field)}
                  {isActive && ' — editing…'}
                </Typography>
                {renderAnswer(field, rawAnswers[field] ?? '')}
              </Box>
              <IconButton
                size="small"
                onClick={() => onEditQuestion(field)}
                disabled={isActive}
                sx={{ mt: 0.5, color: isActive ? 'primary.main' : 'text.secondary' }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
