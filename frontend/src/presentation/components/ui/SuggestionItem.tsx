import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

interface SuggestionItemProps {
  text: string;
  highlighted: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
}

export default function SuggestionItem({
  text,
  highlighted,
  onClick,
  onMouseEnter,
}: SuggestionItemProps) {
  return (
    <Box
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      role="option"
      aria-selected={highlighted}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2.5,
        py: 1.5,
        cursor: 'pointer',
        borderLeft: highlighted ? '3px solid' : '3px solid transparent',
        borderColor: highlighted ? 'primary.main' : 'transparent',
        bgcolor: highlighted ? 'background.paper' : 'transparent',
        transition: 'all 0.12s ease',
        '&:hover': { bgcolor: 'background.paper' },
      }}
    >
      <AutoAwesomeIcon sx={{ fontSize: 16, color: 'primary.main', flexShrink: 0 }} />
      <Typography variant="body2" color="text.primary">
        {text}
      </Typography>
    </Box>
  );
}
