'use client';
import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { useSuggestions } from '@/presentation/hooks/useSuggestions';
import { useDebounce } from '@/presentation/hooks/useDebounce';
import { useKeyboardNav } from '@/presentation/hooks/useKeyboardNav';
import SuggestionDropdown from './SuggestionDropdown';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const debouncedInput = useDebounce(input, 300);
  const { suggestions, isLoading, fetchSuggestions, clearSuggestions } = useSuggestions();
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (debouncedInput.trim()) {
      fetchSuggestions(debouncedInput);
      setOpen(true);
    } else {
      clearSuggestions();
      setOpen(false);
    }
  }, [debouncedInput, fetchSuggestions, clearSuggestions]);

  const handleSelect = (text: string) => {
    setInput(text);
    setOpen(false);
    clearSuggestions();
    router.push(`/generate?q=${encodeURIComponent(text)}`);
  };

  const handleClose = () => setOpen(false);

  const { highlightedIndex, handleKeyDown, resetIndex } = useKeyboardNav({
    itemCount: suggestions.length,
    onSelect: (i) => handleSelect(suggestions[i].text),
    onClose: handleClose,
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%', maxWidth: 680 }}>
      <TextField
        fullWidth
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          resetIndex();
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
        placeholder="e.g. I run a small bakery and need a simple website…"
        aria-label="Describe your business"
        aria-autocomplete="list"
        aria-expanded={open}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: 'white',
            borderRadius: '50px',
            fontSize: '1rem',
            boxShadow: '0 2px 16px rgba(59,158,219,0.10)',
            '& input': { px: 1, py: 1.5 },
          },
        }}
      />
      {open && (
        <SuggestionDropdown
          suggestions={suggestions}
          isLoading={isLoading}
          highlightedIndex={highlightedIndex}
          onSelect={handleSelect}
          onHighlight={(i) => { resetIndex(); }}
        />
      )}
    </Box>
  );
}
