'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface ServiceRow {
  name: string;
  description: string;
}

interface Props {
  onSubmit: (value: string) => void;
  initialValue?: string;
}

function parseInitial(raw?: string): ServiceRow[] {
  if (!raw) return [{ name: '', description: '' }];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  return [{ name: '', description: '' }];
}

export default function ServiceListInput({ onSubmit, initialValue }: Props) {
  const [rows, setRows] = useState<ServiceRow[]>(parseInitial(initialValue));

  const update = (i: number, field: keyof ServiceRow, val: string) =>
    setRows(r => r.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)));

  const add = () => setRows(r => [...r, { name: '', description: '' }]);
  const remove = (i: number) => setRows(r => r.filter((_, idx) => idx !== i));

  const handleSubmit = () => {
    const valid = rows.filter(r => r.name.trim());
    if (valid.length === 0) return;
    onSubmit(JSON.stringify(valid));
  };

  const canSubmit = rows.some(r => r.name.trim());

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'flex-start',
            bgcolor: 'background.default',
            borderRadius: '12px',
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, flex: 1 }}>
            <TextField
              size="small"
              fullWidth
              placeholder="Service name *"
              value={row.name}
              onChange={e => update(i, 'name', e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
            />
            <TextField
              size="small"
              fullWidth
              placeholder="Short description (optional)"
              value={row.description}
              onChange={e => update(i, 'description', e.target.value)}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
            />
          </Box>
          {rows.length > 1 && (
            <IconButton size="small" onClick={() => remove(i)} sx={{ mt: 0.5, color: 'text.secondary' }}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={add}
          sx={{ borderRadius: '50px', borderColor: 'divider', color: 'text.secondary' }}
        >
          Add service
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          {rows.filter(r => r.name.trim()).length} service{rows.filter(r => r.name.trim()).length !== 1 ? 's' : ''} added
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!canSubmit}
          endIcon={<ArrowForwardIcon />}
          sx={{ borderRadius: '50px', px: 3 }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
}
