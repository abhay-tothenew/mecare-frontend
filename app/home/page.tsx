import React from "react";
import styles from "../styles/home.module.css";
import Image from "next/image";
import Footer from "../components/Footer";
// import { FaSearch, FaUserMd, FaPills, FaHeartbeat, FaVial } from "react-icons/fa";

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroSection}>
          <p className={styles.heroText}>Find a doctor at your own ease</p>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Search doctors" />
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Our Expertise</h2>
        <div className={styles.serviceGrid}>
          <div className={styles.serviceCard}>
            {/* <FaUserMd className={styles.serviceIcon} /> */}
            <Image
              src="/assets/home-care.png"
              height={50}
              width={50}
              alt="Home Care"
            />
            <p>HOME CARE SERVICES</p>
          </div>
          <div className={styles.serviceCard}>
            {/* <FaPills className={styles.serviceIcon} /> */}
            <Image
              src="/assets/pharmacy.png"
              height={50}
              width={50}
              alt="Pharmacy"
            />
            <p>PHARMACY SERVICES</p>
          </div>
          <div className={styles.serviceCard}>
            {/* <FaHeartbeat className={styles.serviceIcon} /> */}
            <Image
              src="/assets/health-checkup.png"
              height={50}
              width={50}
              alt="health check"
            />
            <p>HEALTH CHECKUP</p>
          </div>
          <div className={styles.serviceCard}>
            {/* <FaVial className={styles.serviceIcon} /> */}
            <Image
              src="/assets/lab-test.png"
              height={50}
              width={50}
              alt="lab test"
            />
            <p>DIAGNOSTICS / LAB TESTS</p>
          </div>
        </div>
      </section>

      {/* Top Doctors Section */}

      <section className={styles.topDoctors}>
      <h2>Our Top Doctors</h2>
      <div className={styles.topDoctorsGrid}>
        {[
          { name: "Dr. Jane Doe, MBBS", specialty: "Dentist", experience: "9 Years", image: "/assets/Frame.png" },
          { name: "Dr. John Doe, MBBS", specialty: "Cardiologist", experience: "12 Years", image: "/assets/Frame.png" },
          { name: "Dr. Alice Smith, MBBS", specialty: "Neurologist", experience: "8 Years", image: "/assets/Frame.png" },
          { name: "Dr. Jane Doe, MBBS", specialty: "Dentist", experience: "9 Years", image: "/assets/Frame.png" },
          { name: "Dr. Jane Doe, MBBS", specialty: "Dentist", experience: "9 Years", image: "/assets/Frame.png" },
          { name: "Dr. Jane Doe, MBBS", specialty: "Dentist", experience: "9 Years", image: "/assets/Frame.png" },
          { name: "Dr. Jane Doe, MBBS", specialty: "Dentist", experience: "9 Years", image: "/assets/Frame.png" },

        ].map((doctor, index) => (
          <div key={index} style ={{
            backgroundColor: "#F8FCF9",
            padding: "20px",
            borderRadius: "12px",
            width: "200px",
            height: "330px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "10px",
          }}>


          <div>
            <div className={styles.imageContainer}>
              <Image src={doctor.image} height={120} width={120} alt={doctor.name} className={styles.doctorImage} />
            </div>
            <p className={styles.doctorName}>{doctor.name}</p>
            <p className={styles.specialty}>
              <span>🩺 {doctor.specialty}</span> <span>⏳ {doctor.experience}</span>
            </p>
            <p className={styles.ratings}>
              Ratings: <span>4.5</span> <span>5</span> <span>4.8</span> <span>4.9</span>
            </p>
            </div>
            <div>
            <button className={styles.appointmentButton}>Book Appointment</button>
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
