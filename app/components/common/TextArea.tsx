import React from 'react';
import styles from './TextArea.module.css';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  fullWidth = false,
  helperText,
  rows = 4,
  className,
  ...props
}) => {
  const textAreaWrapperClasses = [
    styles.textAreaWrapper,
    !fullWidth && styles.textAreaWrapperNotFullWidth,
  ].filter(Boolean).join(' ');

  const textAreaClasses = [
    styles.textArea,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  const helperTextClasses = [
    styles.helperText,
    error && styles.errorText,
  ].filter(Boolean).join(' ');

  return (
    <div className={textAreaWrapperClasses}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea className={textAreaClasses} rows={rows} {...props} />
      {(error || helperText) && (
        <div className={helperTextClasses}>{error || helperText}</div>
      )}
    </div>
  );
};

export default TextArea; 