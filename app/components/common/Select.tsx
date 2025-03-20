import React from 'react';
import styles from './Select.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  helperText?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  fullWidth = false,
  helperText,
  options,
  className,
  ...props
}) => {
  const selectWrapperClasses = [
    styles.selectWrapper,
    !fullWidth && styles.selectWrapperNotFullWidth,
  ].filter(Boolean).join(' ');

  const selectClasses = [
    styles.select,
    error && styles.error,
    className,
  ].filter(Boolean).join(' ');

  const helperTextClasses = [
    styles.helperText,
    error && styles.errorText,
  ].filter(Boolean).join(' ');

  return (
    <div className={selectWrapperClasses}>
      {label && <label className={styles.label}>{label}</label>}
      <select className={selectClasses} {...props}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {(error || helperText) && (
        <div className={helperTextClasses}>{error || helperText}</div>
      )}
    </div>
  );
};

export default Select; 