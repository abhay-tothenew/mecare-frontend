import styles from "../styles/button.module.css";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
}

export default function Button({ text, variant = "primary", onClick, className }: ButtonProps) {
  return (
    <button
    className={`${styles.button} ${styles[variant]} ${className || ""}`}
    onClick={onClick}
  >
    {text}
  </button>
  );
}
