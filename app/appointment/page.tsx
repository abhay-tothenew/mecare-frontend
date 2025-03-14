"use client";
import { useState } from "react";
import styles from "../styles/appointments.module.css";
import Categories from "../../public/data/categories.json";
import Blogs from "../../public/data/blogs.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
        <div className={styles.categoriesContainer}>
          <h2>Browse Categories</h2>

          <div className={styles.categories}>
            {Categories.map((category, index) => (
              <div
                className={styles.category}
                key={index}
                onClick={() => handleCategory(category.name)}
              >
                <Image
                  src={category.image}
                  width={80}
                  height={80}
                  alt={category.name}
                  priority={index < 5}
                />
                <h3>{category.name}</h3>
              </div>
            ))}
          </div>

          {/* Doctor search in area */}
          <div className={styles.searchDoctor}>
            <h2>Find Doctors in your area</h2>

            <div className={styles.searchForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="appointment-date">Select Date</label>
                <input
                  id="appointment-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="appointment-location">Enter Location</label>
                <input
                  id="appointment-location"
                  type="text"
                  value={location}
                  placeholder="City, ZIP code"
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
                {Blogs.map((blog) => (
                  <div key={blog.id} className={styles.articleCard}>
                    <Image
                      src={blog.image}
                      width={200}
                      height={130}
                      alt={blog.title}
                      className={styles.articleImage}
                    />
                    <h3 className={styles.articleTitle}>{blog.title}</h3>
                    <p className={styles.articleMeta}>
                      By {blog.author} - {blog.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
