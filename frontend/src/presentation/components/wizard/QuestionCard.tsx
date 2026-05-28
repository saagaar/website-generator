'use client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import AnswerInput from './AnswerInput';
import ServiceListInput from './inputs/ServiceListInput';
import TeamListInput from './inputs/TeamListInput';
import SocialLinksInput from './inputs/SocialLinksInput';
import PhoneInput from './inputs/PhoneInput';
import ColorPickerInput from './inputs/ColorPickerInput';
import { fieldValidators } from './validation';

const MULTI_VALUE_FIELDS: Record<string, React.ComponentType<{ onSubmit: (v: string) => void; initialValue?: string }>> = {
  services: ServiceListInput,
  team: TeamListInput,
  socialLinks: SocialLinksInput,
  phone: PhoneInput,
  colorTheme: ColorPickerInput,
};

interface Props {
  question: string | null;
  field?: string;
  isLoading: boolean;
  error: string | null;
  onAnswer: (value: string) => void;
  initialValue?: string;
  isEditing?: boolean;
}

export default function QuestionCard({ question, field, isLoading, error, onAnswer, initialValue, isEditing }: Props) {
  const MultiValueInput = field ? MULTI_VALUE_FIELDS[field] : undefined;
  const validate = field ? fieldValidators[field] : undefined;

  return (
    <Box
      sx={{
        animation: 'slideIn 0.35s ease',
        '@keyframes slideIn': {
          from: { opacity: 0, transform: 'translateX(24px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
      }}
    >
      {isLoading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, minHeight: 40 }}>
          <CircularProgress size={18} thickness={4} />
          <Typography variant="body2" color="text.secondary">
            Thinking of the next question…
          </Typography>
        </Box>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {question && !isLoading && (
        <>
          {isEditing && (
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 600, mb: 1, display: 'block', letterSpacing: '0.08em' }}>
              ✏ Editing your answer
            </Typography>
          )}
          <Typography
            variant="h5"
            sx={{ fontWeight: 400, mb: 3, color: 'text.primary', lineHeight: 1.4 }}
          >
            {question}
          </Typography>
          {MultiValueInput ? (
            <MultiValueInput onSubmit={onAnswer} initialValue={initialValue} />
          ) : (
            <AnswerInput onSubmit={onAnswer} initialValue={initialValue} validate={validate} />
          )}
        </>
      )}
    </Box>
  );
}
