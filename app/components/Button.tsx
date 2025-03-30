import styles from "../styles/button.module.css";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({ text, variant = "primary", onClick, className, disabled }: ButtonProps) {
  return (
    <button
    className={`${styles.button} ${styles[variant]} ${className || ""}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
  );
}
