"use client";
import { useState } from "react";
// import UpcomingAppointments from "@/components/appointments/UpcomingAppointments";
// import PastAppointments from "@/components/appointments/PastAppointments";
// import BookAppointment from "@/components/appointments/BookAppointment";
// import AppointmentNotifications from "@/components/appointments/AppointmentNotifications";
// import ManageAppointments from "@/components/appointments/ManageAppointments";
import styles from "../styles/appointments.module.css";
import Reviews from "../reviews/page";
import Categories from "../../public/data/categories.json";
import Blogs from "../../public/data/blogs.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Appointment() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();


  const handleCategory = (categoryName: string) => {
    router.push(`/appointment/${categoryName}`);
  };

  return (
    <>
    <div className={styles.container}>
      {/* <div className={styles.tabs}>
        <button
          onClick={() => setActiveTab("upcoming")}
          className={activeTab === "upcoming" ? styles.active : ""}
        >
          Upcoming
        </button>
        <button
          onClick={() => setActiveTab("past")}
          className={activeTab === "past" ? styles.active : ""}
        >
          Past
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={activeTab === "notifications" ? styles.active : ""}
        >
          Notifications
        </button>
        <button
          onClick={() => setActiveTab("manage")}
          className={activeTab === "manage" ? styles.active : ""}
        >
          Manage
        </button>
      </div> */}
      {/* <div className={styles.content}> */}
        {/* TODO: Add in the components for each tab */}
        {/* {activeTab === "upcoming" && <UpcomingAppointments />}
        {activeTab === "past" && <PastAppointments />}
        {activeTab === "book" && <BookAppointment />}
        {activeTab === "notifications" && <AppointmentNotifications />}
        {activeTab === "manage" && <ManageAppointments />} */}
{/* 
        {activeTab === "upcoming" && <Reviews />}
        {activeTab === "past" && <Reviews />}
        {activeTab === "book" && <Reviews />}
        {activeTab === "notifications" && <Reviews />}
        {activeTab === "manage" && <Reviews />}
      </div> */}

      {/* Browse Categories */}

      <div
        className={styles.categoriesContainer}
      >
        <h2>Browse Categories</h2>

        <div className={styles.categories}>
          {Categories.map((category, index) => (
            <div className={styles.category} key={index} onClick={()=>handleCategory(category.name)}>
              <Image
                src={category.image}
                width={80}
                height={80}
                alt="category"
              />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>

        {/* Doctor search in area */}

        <div className={styles.searchDoctor}>
          <h2>Find Doctors in your area</h2>

          <div
            className={styles.searchForm}
          >
            <div className={styles.inputGroup}>
              <label>Select Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.inputField}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Enter Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.inputField}
              />
            </div>
            <button className={styles.searchButton}>
              <p>Search</p>
            </button>
          </div>
          <div className={styles.articlesContainer}>
            <div className={styles.header}>
              <h2>Health Articles For You</h2>
              <a href="#" className={styles.viewAll}>
                View All
              </a>
            </div>

            <div className={styles.articlesGrid}>
              {Blogs.map((blogs) => (
                <div key={blogs.id} className={styles.articleCard}>
                  <Image
                    src={blogs.image}
                    width={200}
                    height={130}
                    alt={blogs.title}
                    className={styles.articleImage}
                  />
                  <h3 className={styles.articleTitle}>{blogs.title}</h3>
                  <p className={styles.articleMeta}>
                    By {blogs.author} - {blogs.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
            <Footer/>
            </>

  );
}
