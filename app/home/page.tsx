"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Footer from "../components/Footer";
// import Doctors from "../../public/data/doctors.json";
// import { auth0 } from "../lib/auth0";
import { Doctors } from "./type";
// import { cookies } from "next/headers";
import DoctorCard from "../components/DoctorCard";
import { API_ENDPOINTS } from "../utils/api/config";

const Home = () => {
  const [topDoctors, setDoctors] = useState<Doctors[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const cookieStore = cookies();
  // const token = cookieStore.then((cookies) => cookies.get("token")?.value);
  // const user = cookieStore.then((cookies) => cookies.get("user")?.value);

  // console.log("Token:", token);
  // console.log("User:", user);

  useEffect(() => {
    const fetchTopDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(API_ENDPOINTS.TOP_DOCTORS);
        const data = await response.json();

        console.log("Top Doctors", data);
        setDoctors(data.doctors);
      } catch (err) {
        console.log("Error fetching doctors", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopDoctors();
  }, []);

  return (
    <div className={styles.container}>
      {/* <SearchBar /> */}

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
        {isLoading ? (
          <div className={styles.loaderContainer}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <div className={styles.topDoctorsGrid}>
            {topDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.doctor_id}
                doctor={doctor}
                variant="home"
              />
            ))}
          </div>
        )}
        {/* <button className={styles.viewAllButton}>View All</button> */}
      </section>
      <Footer />
    </div>
  );
};

export default Home;
