import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  helperText,
  className,
  ...props
}) => {
  const inputWrapperClasses = [
    styles.inputWrapper,
    !fullWidth && styles.inputWrapperNotFullWidth,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    styles.input,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  const helperTextClasses = [
    styles.helperText,
    error && styles.errorText,
  ].filter(Boolean).join(' ');

  return (
    <div className={inputWrapperClasses}>
      {label && <label className={styles.label}>{label}</label>}
      <input className={inputClasses} {...props} />
      {(error || helperText) && (
        <div className={helperTextClasses}>{error || helperText}</div>
      )}
    </div>
  );
};

export default Input; 