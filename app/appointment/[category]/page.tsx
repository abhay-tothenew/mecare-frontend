"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/categoryDoctor.module.css";
import Categories from "../../../public/data/categories.json";
import Footer from "@/app/components/Footer";
import SearchBar from "@/app/components/SearchBar";
import { useRouter } from "next/navigation";

interface Doctor {
  id: number;
  name: string;
  experience: string;
  ratings: number;
  image: string;
  location: string;
  gender: string;
}

export default function Category({ params }: { params: any }) {
  const { category } = params;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [filters, setFilters] = useState({
    rating: 0,
    experience: "all",
    gender: "all",
  });

  const router = useRouter();

  useEffect(() => {
    const selectedCategory = Categories.find(
      (cat: any) => cat.name === category
    );
    if (selectedCategory) {
      setDoctors(selectedCategory.doctors || []);
      setFilteredDoctors(selectedCategory.doctors || []);
    }
  }, [category]);

  // Filtering as per the selected filters
  useEffect(() => {
    let updatedDoctors = doctors;

    if (filters.rating > 0) {
      updatedDoctors = updatedDoctors.filter(
        (doctor) => doctor.ratings === filters.rating
      );
    }

    if (filters.experience !== "all") {
      const expValue = parseInt(filters.experience);
      updatedDoctors = updatedDoctors.filter(
        (doctor) => parseInt(doctor.experience) <= expValue
      );
    }

    if (filters.gender !== "all") {
      updatedDoctors = updatedDoctors.filter(
        (doctor) => doctor.gender.toLowerCase() === filters.gender
      );
    }

    setFilteredDoctors(updatedDoctors);
  }, [filters, doctors]);

  return (
    <>
    <div className={styles.container}>
      <SearchBar />
      <div className={styles.doctorsContainer}>
        <div className={styles.doctorsHeader}>
          <h2>{filteredDoctors.length} doctors available</h2>
          <p>
            Book appointments with minimum wait-time & verified doctor details
          </p>
        </div>

        <div className={styles.content}>
          {/* Sidebar Filters */}
          <div className={styles.filters}>
            <div className={styles.filterContainer}> 
            <h3 style ={{
                color:"#0E2515",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: "500",
            }}>Filter By:</h3>
            {/* <button
              onClick={() =>
                setFilters({ rating: 0, experience: "all", gender: "all" })
              }
            >
              Reset
            </button> */}

            <span onClick={() => setFilters({ rating: 0, experience: "all", gender: "all" })}>Reset</span>
            </div>

            <div className={styles.filterSection}>
              <h4>Rating</h4>
              <label>
                <input
                  type="radio"
                  name="rating"
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, rating: 0 }))
                  }
                />{" "}
                Show all
              </label>
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, rating: star }))
                    }
                  />{" "}
                  {star} star
                </label>
              ))}
            </div>

            <div className={styles.filterSection}>
              <h4>Experience</h4>
              {["all", "15", "10", "5", "3", "1"].map((year) => (
                <label key={year}>
                  <input
                    type="radio"
                    name="experience"
                    onChange={() =>
                      setFilters((prev) => ({ ...prev, experience: year }))
                    }
                  />
                  {year === "all" ? "Show all" : `≤ ${year} years`}
                </label>
              ))}
            </div>

            <div className={styles.filterSection}>
              <h4>Gender</h4>
              <label>
                <input
                  type="radio"
                  name="gender"
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, gender: "all" }))
                  }
                />{" "}
                Show all
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, gender: "male" }))
                  }
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, gender: "female" }))
                  }
                />{" "}
                Female
              </label>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className={styles.doctorGrid}>
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className={styles.doctorCard}>
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className={styles.doctorImage}
                />
                <h3>{doctor.name}</h3>
                <p>
                   {category} | {doctor.experience}
                </p>
                <p style = {{
                    marginBottom: "15px",
                }}> Ratings: {doctor.ratings} Stars</p>
                <button className={styles.bookButton} onClick={()=> router.push("/appointment/ScheduleSlot")}>Book Appointment</button>
              </div>
            ))}
          </div>
        </div>


      </div>

    </div>
    <Footer/>
    </>
  );
}
