import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import SuggestionItem from './SuggestionItem';
import type { Suggestion } from '@/domain/entities/Suggestion';

interface SuggestionDropdownProps {
  suggestions: Suggestion[];
  isLoading: boolean;
  highlightedIndex: number;
  onSelect: (text: string) => void;
  onHighlight: (index: number) => void;
}

export default function SuggestionDropdown({
  suggestions,
  isLoading,
  highlightedIndex,
  onSelect,
  onHighlight,
}: SuggestionDropdownProps) {
  if (!isLoading && suggestions.length === 0) return null;

  return (
    <Paper
      role="listbox"
      elevation={0}
      sx={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        right: 0,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        zIndex: 50,
        maxHeight: 320,
        overflowY: 'auto',
        animation: 'fadeSlideIn 0.15s ease',
        '@keyframes fadeSlideIn': {
          from: { opacity: 0, transform: 'translateY(-8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {isLoading && suggestions.length === 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 2.5, py: 2 }}>
          <CircularProgress size={16} />
          <Typography variant="body2" color="text.secondary">
            Finding suggestions…
          </Typography>
        </Box>
      )}

      {suggestions.map((s, i) => (
        <SuggestionItem
          key={s.id}
          text={s.text}
          highlighted={i === highlightedIndex}
          onClick={() => onSelect(s.text)}
          onMouseEnter={() => onHighlight(i)}
        />
      ))}

      {suggestions.length > 0 && (
        <>
          <Divider sx={{ borderColor: 'divider' }} />
          <Box sx={{ px: 2.5, py: 1 }}>
            <Typography variant="caption" color="text.disabled">
              Press Enter to start building →
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
}
