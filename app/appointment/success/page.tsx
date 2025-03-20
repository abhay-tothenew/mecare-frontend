"use client";
import { useRouter } from "next/navigation";
import styles from "@/app/styles/success.module.css";

export default function AppointmentSuccess() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.successIcon}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="32" fill="#4CAF50" fillOpacity="0.1"/>
            <path 
              d="M20 32L28 40L44 24" 
              stroke="#4CAF50" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        <h1>Appointment Confirmed!</h1>
        <p>Your appointment has been successfully scheduled. We have sent a confirmation email with all the details.</p>
        
        <div className={styles.actions}>
          <button 
            onClick={() => router.push("/home")}
            className={styles.primaryButton}
          >
            Go to Home
          </button>
          <button 
            onClick={() => router.push("/user-profile")}
            className={styles.secondaryButton}
          >
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
} 