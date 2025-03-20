import React from 'react';
import { colors, spacing, borderRadius } from '@/app/constants/theme';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, title, style }) => {
  const cardStyles = {
    backgroundColor: colors.background.default,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    ...style,
  };

  const titleStyles = {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.text.primary,
    marginBottom: spacing.md,
  };

  return (
    <div style={cardStyles}>
      {title && <h2 style={titleStyles}>{title}</h2>}
      {children}
    </div>
  );
};

export default Card; 