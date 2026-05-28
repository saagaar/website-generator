'use client';
import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

interface TeamRow {
  name: string;
  role: string;
  imageDataUrl?: string;
}

interface Props {
  onSubmit: (value: string) => void;
  initialValue?: string;
}

function parseInitial(raw?: string): TeamRow[] {
  if (!raw) return [{ name: '', role: '' }];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  return [{ name: '', role: '' }];
}

export default function TeamListInput({ onSubmit, initialValue }: Props) {
  const [rows, setRows] = useState<TeamRow[]>(parseInitial(initialValue));
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (i: number, field: keyof TeamRow, val: string) =>
    setRows(r => r.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)));

  const add = () => setRows(r => [...r, { name: '', role: '' }]);
  const remove = (i: number) => setRows(r => r.filter((_, idx) => idx !== i));

  const handleImageUpload = (i: number, file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target?.result as string;
      setRows(r => r.map((row, idx) => (idx === i ? { ...row, imageDataUrl: dataUrl } : row)));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const valid = rows.filter(r => r.name.trim());
    if (valid.length === 0) return;
    onSubmit(JSON.stringify(valid));
  };

  const canSubmit = rows.some(r => r.name.trim());
  const memberCount = rows.filter(r => r.name.trim()).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {rows.map((row, i) => (
        <Box
          key={i}
          sx={{
            display: 'flex',
            gap: 1.5,
            alignItems: 'center',
            bgcolor: 'background.default',
            borderRadius: '12px',
            p: 1.5,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          {/* Avatar / photo upload */}
          <Tooltip title={row.imageDataUrl ? 'Change photo' : 'Upload photo'} placement="top">
            <Box
              onClick={() => fileRefs.current[i]?.click()}
              sx={{ cursor: 'pointer', flexShrink: 0 }}
            >
              <Avatar
                src={row.imageDataUrl}
                sx={{
                  width: 48, height: 48,
                  bgcolor: 'primary.light',
                  fontSize: '1.1rem',
                  border: '2px dashed',
                  borderColor: row.imageDataUrl ? 'primary.light' : 'primary.light',
                  transition: 'border-color 0.15s, opacity 0.15s',
                  '&:hover': { opacity: 0.8, borderColor: 'primary.main' },
                }}
              >
                {!row.imageDataUrl && (
                  row.name.trim() ? row.name.trim()[0].toUpperCase() : <AddAPhotoIcon sx={{ fontSize: 18 }} />
                )}
              </Avatar>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={el => { fileRefs.current[i] = el; }}
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(i, file);
                  e.target.value = '';
                }}
              />
            </Box>
          </Tooltip>

          <TextField
            size="small"
            placeholder="Name *"
            value={row.name}
            onChange={e => update(i, 'name', e.target.value)}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
          />
          <TextField
            size="small"
            placeholder="Role (e.g. CEO)"
            value={row.role}
            onChange={e => update(i, 'role', e.target.value)}
            sx={{ flex: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
          />
          {rows.length > 1 && (
            <IconButton size="small" onClick={() => remove(i)} sx={{ color: 'text.secondary' }}>
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
          Add member
        </Button>
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          {memberCount} member{memberCount !== 1 ? 's' : ''} added
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
