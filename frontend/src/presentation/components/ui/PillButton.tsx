'use client';
import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { forwardRef } from 'react';

interface PillButtonProps extends Omit<ButtonProps, 'href'> {
  href?: string;
}

const PillButton = forwardRef<HTMLButtonElement, PillButtonProps>(
  ({ href, children, ...props }, ref) => {
    if (href) {
      return (
        <Button component={Link} href={href} ref={ref} {...props}>
          {children}
        </Button>
      );
    }
    return (
      <Button ref={ref} {...props}>
        {children}
      </Button>
    );
  }
);

PillButton.displayName = 'PillButton';
export default PillButton;
