'use client';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Link from 'next/link';
import PillButton from '@/presentation/components/ui/PillButton';
import { useScrollTrigger } from '@mui/material';

const NAV_LINKS = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Examples', href: '/examples' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
];

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const elevated = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: elevated ? '1px solid' : '1px solid transparent',
          borderColor: elevated ? 'divider' : 'transparent',
          transition: 'border-color 0.2s ease',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto', px: { xs: 2, md: 4 } }}>
          <Box
            component={Link}
            href="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: 'inherit', flexGrow: { xs: 1, md: 0 } }}
          >
            <AutoAwesomeIcon sx={{ color: 'primary.main', fontSize: 22 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, letterSpacing: '-0.01em' }}>
              SiteGen
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 4, flexGrow: 1 }}>
            {NAV_LINKS.map((link) => (
              <Box
                key={link.href}
                component={Link}
                href={link.href}
                sx={{
                  px: 2, py: 1, borderRadius: 2,
                  textDecoration: 'none', color: 'text.secondary', fontSize: '0.9rem',
                  '&:hover': { color: 'primary.main', bgcolor: 'background.paper' },
                  transition: 'all 0.15s ease',
                }}
              >
                {link.label}
              </Box>
            ))}
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <PillButton variant="contained" color="primary" href="/generate" size="small">
              Get Started →
            </PillButton>
          </Box>

          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 1 }}>
            <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close menu">
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {NAV_LINKS.map((link) => (
              <ListItem key={link.href} disablePadding>
                <ListItemButton component={Link} href={link.href} onClick={() => setDrawerOpen(false)}>
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem sx={{ mt: 2, px: 2 }}>
              <PillButton variant="contained" fullWidth href="/generate" onClick={() => setDrawerOpen(false)}>
                Get Started →
              </PillButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
