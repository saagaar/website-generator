'use client';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PRESETS = [
  { label: 'Sky Blue',      hex: '#3B9EDB' },
  { label: 'Forest Green',  hex: '#2D7D4F' },
  { label: 'Coral',         hex: '#E8614D' },
  { label: 'Slate',         hex: '#4A5568' },
  { label: 'Gold',          hex: '#D4A017' },
  { label: 'Charcoal',      hex: '#2D3748' },
];

const isValidHex = (v: string) => /^#[0-9A-Fa-f]{6}$/.test(v);

interface Props {
  onSubmit: (value: string) => void;
  initialValue?: string;
}

export default function ColorPickerInput({ onSubmit, initialValue }: Props) {
  const defaultColor = initialValue && isValidHex(initialValue) ? initialValue : '#3B9EDB';
  const [hex, setHex] = useState(defaultColor);
  const colorRef = useRef<HTMLInputElement>(null);

  const applyColor = (val: string) => {
    setHex(val);
    if (colorRef.current) colorRef.current.value = val;
  };

  const handleHexInput = (raw: string) => {
    const val = raw.startsWith('#') ? raw : `#${raw}`;
    setHex(val);
    if (isValidHex(val) && colorRef.current) colorRef.current.value = val;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Swatch + hex field + continue */}
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Box
          component="label"
          sx={{
            width: 56, height: 56,
            borderRadius: '12px',
            border: '2px solid',
            borderColor: 'divider',
            bgcolor: isValidHex(hex) ? hex : '#ccc',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0,
            transition: 'border-color 0.15s, background-color 0.15s',
            '&:hover': { borderColor: 'primary.main' },
          }}
        >
          <input
            ref={colorRef}
            type="color"
            defaultValue={defaultColor}
            onChange={e => applyColor(e.target.value)}
            style={{ opacity: 0, width: 1, height: 1, position: 'absolute', pointerEvents: 'none' }}
          />
        </Box>

        <TextField
          size="small"
          value={hex}
          onChange={e => handleHexInput(e.target.value)}
          placeholder="#3B9EDB"
          slotProps={{ htmlInput: { maxLength: 7, style: { fontFamily: 'monospace' } } }}
          sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => isValidHex(hex) && onSubmit(hex)}
          disabled={!isValidHex(hex)}
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: '50px', px: 3, flexShrink: 0 }}
        >
          Continue
        </Button>
      </Box>

      {/* Preset swatches */}
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
          Or pick a preset
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {PRESETS.map(p => (
            <Tooltip key={p.hex} title={p.label} arrow placement="top">
              <Box
                onClick={() => applyColor(p.hex)}
                sx={{
                  width: 36, height: 36,
                  borderRadius: '8px',
                  bgcolor: p.hex,
                  cursor: 'pointer',
                  border: '2px solid',
                  borderColor: hex === p.hex ? 'primary.main' : 'transparent',
                  outline: hex === p.hex ? '2px solid' : 'none',
                  outlineColor: 'primary.light',
                  outlineOffset: '2px',
                  transition: 'transform 0.15s, border-color 0.15s',
                  '&:hover': { transform: 'scale(1.15)' },
                }}
              />
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
