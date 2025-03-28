"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/DoctorCard.module.css";
import { useAuth } from "../utils/context/Authcontext";
import { Star } from "lucide-react";
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

export default function DoctorCard({
  doctor,
  variant = "category",
  onBookAppointment,
}: DoctorCardProps) {
  const router = useRouter();
  const [ratings, setRatings] = useState();
  const { user } = useAuth();

  const handleCardClick = () => {
    router.push(`/doctors/${doctor.doctor_id}`);
  };

  useEffect(() => {
    const fetchDoctorRatings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/reviews/${doctor.doctor_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        const data = await response.json();
        console.log("doctor ratings", data);
        setRatings(data.average_rating);
      } catch (error) {
        console.log("Error fetching doctor ratings", error);
      }
    };

    fetchDoctorRatings();
  }, [doctor.doctor_id]);

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

        <div className={styles.ratingSection}>
          <p className={styles.ratings}>Ratings:{ratings || 0}</p>
          <Star
            size={16}
            fill="#FFD700"
            style={{
              marginBottom: "12px",
            }}
          />
        </div>
      </div>

      <button className={styles.bookButton} onClick={handleBookAppointment}>
        Book Appointment
      </button>
    </div>
  );
}
