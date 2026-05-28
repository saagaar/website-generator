'use client';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Validator } from './validation';

interface Props {
  onSubmit: (value: string) => void;
  disabled?: boolean;
  initialValue?: string;
  validate?: Validator;
}

export default function AnswerInput({ onSubmit, disabled, initialValue, validate }: Props) {
  const [value, setValue] = useState(initialValue ?? '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue ?? '');
    setErrorMsg(null);
    inputRef.current?.focus();
  }, [initialValue]);

  const handleSubmit = () => {
    if (!value.trim()) return;
    if (validate) {
      const err = validate(value.trim());
      if (err) { setErrorMsg(err); return; }
    }
    onSubmit(value.trim());
    setValue('');
    setErrorMsg(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          value={value}
          onChange={e => { setValue(e.target.value); setErrorMsg(null); }}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Type your answer… (Enter to continue)"
          disabled={disabled}
          variant="outlined"
          error={!!errorMsg}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px',
              bgcolor: '#FFFFFF',
              fontSize: '1rem',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          sx={{ borderRadius: '16px', minWidth: 48, height: 56, px: 2 }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>
      {errorMsg && (
        <FormHelperText error sx={{ ml: 1.5 }}>
          {errorMsg}
        </FormHelperText>
      )}
    </Box>
  );
}
