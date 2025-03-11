import styles from './ResponsiveContainer.module.css';

type ResponsiveContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ResponsiveContainer({ children, className = '' }: ResponsiveContainerProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
} 