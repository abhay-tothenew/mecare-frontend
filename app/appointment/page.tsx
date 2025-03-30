"use client";
import { useEffect, useState } from "react";
import styles from "../styles/appointments.module.css";
import Blogs from "../../public/data/blogs.json";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import { API_ENDPOINTS } from "../utils/api/config";

interface Category {
  image_url?: string;
  id: string;
  category_name: string;
  category_tag: string;
}

export default function Appointment() {
  // const [activeTab, setActiveTab] = useState("upcoming");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.DISEASE);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);
  const handleCategory = (categoryTag: string) => {
    router.push(`/appointment/${categoryTag}`);
  };

  return (
    <>
      {/* <SearchBar /> */}

      <div className={styles.container}>
        <div className={styles.categoriesContainer}>
          <h2>Browse Categories</h2>

          <div className={styles.categories}>
            {categories.map((category, index) => (
              <div
                className={styles.category}
                key={index}
                onClick={() => handleCategory(category.category_name)}
              >
                <Image
                  src={category.image_url || "/assets/Frame.png"}
                  width={80}
                  height={80}
                  alt={category.category_name}
                />
                <p>{category.category_name}</p>
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
