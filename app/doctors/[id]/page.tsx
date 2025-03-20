"use client";
import { redirect, useParams } from "next/navigation";
import Image from "next/image";
import styles from "../../styles/doctor-profile.module.css";

// This would typically come from an API/database
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  experience: "15+ years",
  education: [
    "MD - Johns Hopkins University",
    "Cardiology Fellowship - Mayo Clinic",
  ],
  languages: ["English", "Spanish"],
  rating: 4.8,
  reviews: 127,
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management.",
  availability: ["Mon-Fri: 9:00 AM - 5:00 PM", "Sat: 9:00 AM - 1:00 PM"],
  location: "123 Medical Center Drive, Suite 200",
  image: "/assets/doctor-placeholder.jpg",
};

export default function DoctorProfile() {
  const params = useParams();
  // In a real app, you would fetch doctor data using the ID
  // const doctorId = params.id;


  const handleBookButton = () => {
    redirect("/appointment/ScheduleSlot");
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.doctorInfo}>
          <Image
            src="/assets/Frame.png"
            alt={mockDoctor.name}
            width={200}
            height={200}
            className={styles.doctorImage}
          />
          <div className={styles.basicInfo}>
            <h1>{mockDoctor.name}</h1>
            <h2>{mockDoctor.specialty}</h2>
            <div className={styles.rating}>
              <span>⭐ {mockDoctor.rating}</span>
              <span>({mockDoctor.reviews} reviews)</span>
            </div>
          </div>
        </div>
        <button className={styles.bookAppointment} onClick={handleBookButton}>Book Appointment</button>
      </div>

      <div className={styles.profileContent}>
        <section className={styles.section}>
          <h3>About</h3>
          <p>{mockDoctor.about}</p>
        </section>

        <section className={styles.section}>
          <h3>Education & Experience</h3>
          <div className={styles.experience}>
            <p>
              <strong>Experience:</strong> {mockDoctor.experience}
            </p>
            <strong>Education:</strong>
            <ul>
              {mockDoctor.education.map((edu, index) => (
                <li key={index}>{edu}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <h3>Languages</h3>
          <div className={styles.languages}>
            {mockDoctor.languages.map((lang, index) => (
              <span key={index} className={styles.language}>
                {lang}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Availability</h3>
          <div className={styles.availability}>
            {mockDoctor.availability.map((time, index) => (
              <p key={index}>{time}</p>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>Location</h3>
          <p>{mockDoctor.location}</p>
        </section>
      </div>
    </div>
  );
}
