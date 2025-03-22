"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../../styles/doctor-profile.module.css";
import Footer from "@/app/components/Footer";
import { colors, spacing, borderRadius } from "@/app/constants/theme";
import { 
  GraduationCap, 
  Clock, 
  MapPin, 
  Languages, 
  Calendar, 
  Phone, 
  DollarSign,
  Award,
  Stethoscope,
  Star
} from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  qualification: string;
  location: string;
  image?: string;
  doctor_id: string;
  phone: string;
  about?: string;
  education?: string[];
  languages?: string[];
  availability?: string[];
  consultation_fee?: number;
  achievements?: string[];
}

export default function DoctorProfile() {
  const params = useParams();
  const router = useRouter();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${params.id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch doctor details');
        }

        setDoctor(data.doctor);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDoctorDetails();
    }
  }, [params.id]);

  const handleBookAppointment = () => {
    if (doctor) {
      router.push(`/appointment/ScheduleSlot/${doctor.doctor_id}`);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: spacing.xl }}>
          <p>Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className={styles.container}>
        <div style={{ textAlign: 'center', padding: spacing.xl }}>
          <p style={{ color: colors.status.error }}>{error || 'Doctor not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.profileHeader}>
          <div className={styles.doctorInfo}>
            <Image
              src={doctor.image || "/assets/Frame.png"}
              alt={doctor.name}
              width={200}
              height={200}
              className={styles.doctorImage}
            />
            <div className={styles.basicInfo}>
              <h1>{doctor.name}</h1>
              <h2>
                <Stethoscope size={20} style={{ marginRight: spacing.xs }} />
                {doctor.specialization}
              </h2>
              <div className={styles.rating}>
                <Star size={16} fill="#FFD700" style={{ marginRight: spacing.xs }} />
                <span>4.5</span>
                <span>(127 reviews)</span>
              </div>
              {doctor.consultation_fee && (
                <div className={styles.consultationFee}>
                  <DollarSign size={16} style={{ marginRight: spacing.xs }} />
                  <span>Consultation Fee: ${doctor.consultation_fee}</span>
                </div>
              )}
            </div>
          </div>
          <button 
            className={styles.bookAppointment} 
            onClick={handleBookAppointment}
            style={{
              backgroundColor: colors.primary.main,
              color: colors.text.white,
              padding: `${spacing.md} ${spacing.xl}`,
              borderRadius: borderRadius.md,
            }}
          >
            Book Appointment
          </button>
        </div>

        <div className={styles.profileContent}>
          {doctor.about && (
            <section className={styles.section}>
              <h3>
                <Award size={24} style={{ marginRight: spacing.sm }} />
                About
              </h3>
              <p>{doctor.about}</p>
            </section>
          )}

          <section className={styles.section}>
            <h3>
              <GraduationCap size={24} style={{ marginRight: spacing.sm }} />
              Education & Experience
            </h3>
            <div className={styles.experience}>
              <p>
                <strong>Experience:</strong> {doctor.experience}
              </p>
              <p>
                <strong>Qualification:</strong> {doctor.qualification}
              </p>
              {doctor.education && (
                <>
                  <strong>Education:</strong>
                  <ul>
                    {doctor.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </>
              )}
              {doctor.achievements && doctor.achievements.length > 0 && (
                <>
                  <strong>Achievements:</strong>
                  <ul>
                    {doctor.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </section>

          {doctor.languages && doctor.languages.length > 0 && (
            <section className={styles.section}>
              <h3>
                <Languages size={24} style={{ marginRight: spacing.sm }} />
                Languages
              </h3>
              <div className={styles.languages}>
                {doctor.languages.map((lang, index) => (
                  <span key={index} className={styles.language}>
                    {lang}
                  </span>
                ))}
              </div>
            </section>
          )}

          {doctor.availability && doctor.availability.length > 0 && (
            <section className={styles.section}>
              <h3>
                <Clock size={24} style={{ marginRight: spacing.sm }} />
                Availability
              </h3>
              <div className={styles.availability}>
                {doctor.availability.map((time, index) => (
                  <p key={index}>
                    <Calendar size={16} style={{ marginRight: spacing.xs }} />
                    {time}
                  </p>
                ))}
              </div>
            </section>
          )}

          <section className={styles.section}>
            <h3>
              <MapPin size={24} style={{ marginRight: spacing.sm }} />
              Location & Contact
            </h3>
            <div className={styles.contactInfo}>
              <p>
                <MapPin size={16} style={{ marginRight: spacing.xs }} />
                {doctor.location}
              </p>
              <p>
                <Phone size={16} style={{ marginRight: spacing.xs }} />
                {doctor.phone}
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
