"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/doctors-profile.module.css";

export default function DoctorProfile() {
    const [selectedDay, setSelectedDay] = useState("Monday");

    //TODO: Fetch from json file
    const doctor: {
        name: string;
        specialty: string;
        location: string;
        image: string;
        availability: { [key: string]: string };
    } = {
        name: "Dr. Olivia Carter",
        specialty: "Cardiologist",
        location: "New York Medical Center",
        image: "/assets/Frame.png",
        availability: {
            Monday: "9:00 AM - 2:00 PM",
            Wednesday: "11:00 AM - 4:00 PM",
            Friday: "10:00 AM - 3:00 PM",
        },
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <div className={styles.imageContainer}>
                    <Image src={doctor.image} alt={doctor.name} width={150} height={150} />
                </div>
                <div className={styles.info}>
                    <h1>{doctor.name}</h1>
                    <p className={styles.specialty}>{doctor.specialty}</p>
                    <p className={styles.location}>{doctor.location}</p>
                </div>
            </div>

            <div className={styles.availability}>
                <h2>Availability Schedule</h2>
                <div className={styles.schedule}>
                    {Object.keys(doctor.availability).map((day) => (
                        <button
                            key={day}
                            className={`${styles.dayButton} ${selectedDay === day ? styles.active : ""}`}
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                <p className={styles.timeSlot}>{doctor.availability[selectedDay]}</p>
            </div>

            <button className={styles.bookButton}>Book Appointment</button>
        </div>
    );
}
