"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/categoryDoctor.module.css";
import Footer from "@/app/components/Footer";
// import SearchBar from "@/app/components/SearchBar";
// import Image from "next/image";
import { use } from "react";
import { Doctor } from "./type";
import DoctorCard from "@/app/components/DoctorCard";
import { API_ENDPOINTS } from "@/app/utils/api/config";

export default function Category({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const category = resolvedParams.category;
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  // const [display_category, setDisplayCategory] = useState("");
  const [filters, setFilters] = useState({
    rating: 0,
    experience: "all",
    gender: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const first_index = (currentPage - 1) * 6;
  const last_index = currentPage * 6;
  const currentDoctors = filteredDoctors.slice(first_index, last_index);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const fetchBySpecialty = async () => {
      try {
        const categoryName = category.split("_").join(" ");
        // console.log("category_name", categoryName);
        // category.charAt(0).toUpperCase() + category.slice(1);
        const category_name = categoryName
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        console.log("category_name", category_name);
        const response = await fetch(API_ENDPOINTS.DOCTORS_BY_SPECIALIZATION(category_name));

        const data = await response.json();
        console.log("data category--->", data);
        setDoctors(data.doctors);
        setTotalPages(data.Pagination.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBySpecialty();
  }, [category]);

  // console.log("doctos0000", doctors);

  useEffect(() => {
    let updatedDoctors = doctors;

    if (debouncedQuery.trim()) {
      const query = debouncedQuery.toLowerCase().trim();
      updatedDoctors = updatedDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query) ||
          doctor.specialization.toLowerCase().includes(query) ||
          (doctor.location && doctor.location.toLowerCase().includes(query))
      );
    }

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
  }, [filters, doctors, debouncedQuery]);

  // Handle filter changes
  const handleFilterChange = (type: string, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // console.log("filtered", filteredDoctors);
  return (
    <>
      {/* <SearchBar /> */}

      {/* Add Search Box */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search by name, specialization, or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.doctorsContainer}>
          <div className={styles.doctorsHeader}>
            <h2>{filteredDoctors.length} doctors available</h2>
            <p>
              Book appointments with minimum wait-time & verified doctor details
            </p>
          </div>

          {/* Mobile filters - Dropdown version */}
          <div className={styles.mobileFilters}>
            <div className={styles.filterContainer}>
              <h3>Filter By:</h3>
              <span
                onClick={() =>
                  setFilters({ rating: 0, experience: "all", gender: "all" })
                }
              >
                Reset
              </span>
            </div>

            <div className={styles.filterDropdown}>
              <select
                onChange={(e) =>
                  handleFilterChange("rating", parseInt(e.target.value))
                }
                value={filters.rating}
              >
                <option value="0">Rating: Show all</option>
                <option value="1">Rating: 1 star</option>
                <option value="2">Rating: 2 stars</option>
                <option value="3">Rating: 3 stars</option>
                <option value="4">Rating: 4 stars</option>
                <option value="5">Rating: 5 stars</option>
              </select>
            </div>

            <div className={styles.filterDropdown}>
              <select
                onChange={(e) =>
                  handleFilterChange("experience", e.target.value)
                }
                value={filters.experience}
              >
                <option value="all">Experience: Show all</option>
                <option value="15">Experience: ≤ 15 years</option>
                <option value="10">Experience: ≤ 10 years</option>
                <option value="5">Experience: ≤ 5 years</option>
                <option value="3">Experience: ≤ 3 years</option>
                <option value="1">Experience: ≤ 1 year</option>
              </select>
            </div>

            <div className={styles.filterDropdown}>
              <select
                onChange={(e) => handleFilterChange("gender", e.target.value)}
                value={filters.gender}
              >
                <option value="all">Gender: Show all</option>
                <option value="Male">Gender: Male</option>
                <option value="Female">Gender: Female</option>
              </select>
            </div>
          </div>

          <div className={styles.content}>
            {/* Desktop Sidebar Filters */}
            <div className={styles.filters}>
              <div className={styles.filterContainer}>
                <h3>Filter By:</h3>
                <span
                  onClick={() =>
                    setFilters({ rating: 0, experience: "all", gender: "all" })
                  }
                >
                  Reset
                </span>
              </div>

              <div className={styles.filterSection}>
                <h4>Rating</h4>
                <label>
                  <input
                    type="radio"
                    name="rating"
                    checked={filters.rating === 0}
                    onChange={() => handleFilterChange("rating", 0)}
                  />{" "}
                  Show all
                </label>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star}>
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.rating === star}
                      onChange={() => handleFilterChange("rating", star)}
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
                      checked={filters.experience === year}
                      onChange={() => handleFilterChange("experience", year)}
                    />
                    {year === "all" ? " Show all" : ` ≤ ${year} years`}
                  </label>
                ))}
              </div>

              <div className={styles.filterSection}>
                <h4>Gender</h4>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === "all"}
                    onChange={() => handleFilterChange("gender", "all")}
                  />{" "}
                  Show all
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === "male"}
                    onChange={() => handleFilterChange("gender", "male")}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    checked={filters.gender === "female"}
                    onChange={() => handleFilterChange("gender", "female")}
                  />{" "}
                  Female
                </label>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className={styles.doctorGrid}>
              {currentDoctors.map((doctor) => (
                <DoctorCard
                  key={doctor.doctor_id}
                  doctor={doctor}
                  variant="category"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "10px",
            marginBottom: "20px",
            alignItems: "center",
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "0",
            }}
          >
            Prev
          </button>
          <span
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "black",
              padding: "0",
            }}
          >
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "0",
            }}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
