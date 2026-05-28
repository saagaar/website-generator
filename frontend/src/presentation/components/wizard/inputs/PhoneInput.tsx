'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const COUNTRIES = [
  { code: 'US', flag: '🇺🇸', dial: '+1',   name: 'United States' },
  { code: 'GB', flag: '🇬🇧', dial: '+44',  name: 'United Kingdom' },
  { code: 'IN', flag: '🇮🇳', dial: '+91',  name: 'India' },
  { code: 'NP', flag: '🇳🇵', dial: '+977', name: 'Nepal' },
  { code: 'AU', flag: '🇦🇺', dial: '+61',  name: 'Australia' },
  { code: 'CA', flag: '🇨🇦', dial: '+1',   name: 'Canada' },
  { code: 'DE', flag: '🇩🇪', dial: '+49',  name: 'Germany' },
  { code: 'FR', flag: '🇫🇷', dial: '+33',  name: 'France' },
  { code: 'JP', flag: '🇯🇵', dial: '+81',  name: 'Japan' },
  { code: 'CN', flag: '🇨🇳', dial: '+86',  name: 'China' },
  { code: 'BR', flag: '🇧🇷', dial: '+55',  name: 'Brazil' },
  { code: 'MX', flag: '🇲🇽', dial: '+52',  name: 'Mexico' },
  { code: 'ZA', flag: '🇿🇦', dial: '+27',  name: 'South Africa' },
  { code: 'NG', flag: '🇳🇬', dial: '+234', name: 'Nigeria' },
  { code: 'AE', flag: '🇦🇪', dial: '+971', name: 'UAE' },
  { code: 'SG', flag: '🇸🇬', dial: '+65',  name: 'Singapore' },
  { code: 'PK', flag: '🇵🇰', dial: '+92',  name: 'Pakistan' },
  { code: 'BD', flag: '🇧🇩', dial: '+880', name: 'Bangladesh' },
  { code: 'PH', flag: '🇵🇭', dial: '+63',  name: 'Philippines' },
  { code: 'KE', flag: '🇰🇪', dial: '+254', name: 'Kenya' },
];

interface Props {
  onSubmit: (value: string) => void;
  initialValue?: string;
}

export default function PhoneInput({ onSubmit, initialValue }: Props) {
  const [countryCode, setCountryCode] = useState('US');
  const [number, setNumber] = useState(initialValue ?? '');
  const [error, setError] = useState<string | null>(null);

  const country = COUNTRIES.find(c => c.code === countryCode)!;

  const handleSubmit = () => {
    const digits = number.replace(/\D/g, '');
    if (digits.length < 6) {
      setError('Please enter a valid phone number');
      return;
    }
    setError(null);
    onSubmit(`${country.dial} ${number.trim()}`);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Select
          size="small"
          value={countryCode}
          onChange={e => setCountryCode(e.target.value)}
          renderValue={val => {
            const c = COUNTRIES.find(x => x.code === val);
            return c ? `${c.flag} ${c.dial}` : val;
          }}
          sx={{
            bgcolor: '#fff',
            borderRadius: '10px',
            minWidth: 110,
            '& .MuiOutlinedInput-notchedOutline': { borderRadius: '10px' },
          }}
        >
          {COUNTRIES.map(c => (
            <MenuItem key={c.code} value={c.code}>
              {c.flag}&nbsp; {c.name} ({c.dial})
            </MenuItem>
          ))}
        </Select>

        <TextField
          size="small"
          fullWidth
          placeholder="Phone number"
          value={number}
          onChange={e => { setNumber(e.target.value); setError(null); }}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleSubmit(); } }}
          error={!!error}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!number.trim()}
          sx={{ borderRadius: '10px', minWidth: 48, height: 40, px: 2, flexShrink: 0 }}
        >
          <ArrowForwardIcon />
        </Button>
      </Box>
      {error && <FormHelperText error sx={{ ml: 1.5 }}>{error}</FormHelperText>}
    </Box>
  );
}
