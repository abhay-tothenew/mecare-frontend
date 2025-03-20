"use client";
import React, { useState, useEffect, use } from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Footer from "../components/Footer";
import Doctors from "../../public/data/doctors.json";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/navigation";
// import { auth0 } from "../lib/auth0";

interface Doctors {
  id: number;
  name: string;
  experience: string;
  ratings: number;
  image: string;
  location: string;
  specialization: string;
  doctor_id: string;
}

const Home = () => {
  const router = useRouter();
  const [topDoctors, setDoctors] = useState<Doctors[]>([]);

  //TODO: separate utils/api/doctors/top6.ts
  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors/top6");
        const data = await response.json();

        console.log("Top Doctors", data);
        setDoctors(data);
      } catch (err) {
        console.log("Error fetching doctors", err);
      }
    };

    fetchTopDoctors();
  }, []);

  return (
    <div className={styles.container}>
      <SearchBar />

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Our Expertise</h2>
        <div className={styles.serviceGrid}>
          <div className={styles.serviceCard}>
            <Image
              src="/assets/home-care.png"
              height={50}
              width={50}
              alt="Home Care"
              priority
            />
            <p>HOME CARE SERVICES</p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/assets/pharmacy.png"
              height={50}
              width={50}
              alt="Pharmacy"
              priority
            />
            <p>PHARMACY SERVICES</p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/assets/health-checkup.png"
              height={50}
              width={50}
              alt="health check"
              priority
            />
            <p>HEALTH CHECKUP</p>
          </div>
          <div className={styles.serviceCard}>
            <Image
              src="/assets/lab-test.png"
              height={50}
              width={50}
              alt="lab test"
              priority
            />
            <p>DIAGNOSTICS / LAB TESTS</p>
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}
      <section className={styles.topDoctors}>
        <h2>Our Top Doctors</h2>
        <div className={styles.topDoctorsGrid}>
          {topDoctors.map((doctor, index) => (
            <div key={index} className={styles.topDoctorCard}>
              <div>
                <div className={styles.imageContainer}>
                  <Image
                    src={doctor.image || "/assets/Frame.png"}
                    height={120}
                    width={120}
                    alt={doctor.name}
                    className={styles.doctorImage}
                  />
                </div>
                <p className={styles.doctorName}>{doctor.name}</p>
                <p className={styles.specialty}>
                  <span>🩺 {doctor.specialization}</span>
                  <span>⏳ {doctor.experience}</span>
                </p>
                <p className={styles.ratings}>
                  Ratings: <span>4.5</span> <span>5</span> <span>4.8</span>{" "}
                  <span>4.9</span>
                </p>
              </div>
              <div>
                <button
                  className={styles.appointmentButton}
                  onClick={() =>
                    router.push(`/appointment/ScheduleSlot/${doctor.doctor_id}`)
                  }
                >
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className={styles.viewAllButton}>View All</button>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
