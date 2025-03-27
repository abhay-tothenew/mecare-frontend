import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/DoctorCard.module.css";

interface DoctorCardProps {
  doctor: {
    doctor_id: string;
    name: string;
    specialization: string;
    experience: string;
    ratings: number;
    image: string;
  };
  variant?: "home" | "category";
  onBookAppointment?: () => void;
}

export default function DoctorCard({ doctor, variant = "category", onBookAppointment }: DoctorCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/doctors/${doctor.doctor_id}`);
  };

  const handleBookAppointment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookAppointment) {
      onBookAppointment();
    } else {
      router.push(`/appointment/ScheduleSlot/${doctor.doctor_id}`);
    }
  };

  return (
    <div className={`${styles.doctorCard} ${styles[variant]}`}>
      <div onClick={handleCardClick} className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <Image
            src={doctor.image || "/assets/Frame.png"}
            alt={doctor.name}
            width={120}
            height={120}
            className={styles.doctorImage}
          />
        </div>
        <h3 className={styles.doctorName}>{doctor.name}</h3>

        <div className={styles.doctorInfo}>
          <div className={styles.infoItem}>
            <Image
              src="/assets/Stethoscope.svg"
              alt="Specialty"
              width={20}
              height={20}
            />
            <span>{doctor.specialization}</span>
          </div>

          <div className={styles.infoItem}>
            <Image
              src="/assets/Hourglass.svg"
              alt="Experience"
              width={20}
              height={20}
            />
            <span>{doctor.experience} years</span>
          </div>
        </div>

        <p className={styles.ratings}>
          Ratings: {doctor.ratings || "4"} Stars
        </p>
      </div>
      
      <button
        className={styles.bookButton}
        onClick={handleBookAppointment}
      >
        Book Appointment
      </button>
    </div>
  );
} 