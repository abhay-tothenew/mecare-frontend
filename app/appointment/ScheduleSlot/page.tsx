"use client";
import Image from "next/image";
import styles from "@/app/styles/schedule-card.module.css";
import { useState } from "react";
import Footer from "@/app/components/Footer";

export default function ScheduleSlot() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedTab, setSelectedTab] = useState("video");

  const slots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];
  return (
    <>
      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Book Your Next Doctor Visit in Seconds.</h1>
            <p>
              CareMate helps you find the best healthcare provider by specialty,
              location, and more, ensuring you get the care you need.
            </p>
          </div>

          <div className={styles.heroImage}>
            {/* Booking Card */}

            <div className={styles.bookingCard}>
              <div className={styles.cardHeader}>
                <h2>Schedule Appointment</h2>
                <button>Book Appointment</button>
              </div>

              <div className={styles.cardToggle}>
                <button
                  className={styles.bookVideo1}
                  style={{
                    backgroundColor:
                      selectedTab === "video" ? "#1C4A2A" : "#fff",
                    color: selectedTab === "video" ? "#fff" : "#000",
                    border:
                      selectedTab === "video"
                        ? "2px solid #1c4a2a"
                        : "1px solid #D3D4DB",
                  }}
                  onClick={() => setSelectedTab("video")}
                >
                  Book Video Consult
                </button>
                <button
                  className={styles.bookVideo2}
                  style={{
                    backgroundColor:
                      selectedTab === "hospital" ? "#1C4A2A" : "#fff",
                    border:
                      selectedTab === "hospital"
                        ? "2px solid #1c4a2a"
                        : "1px solid #D3D4DB",
                    color: selectedTab !== "video" ? "#fff" : "#000",
                  }}
                  onClick={() => setSelectedTab("hospital")}
                >
                  Book Hospital Visit
                </button>
              </div>

              <div className={styles.dateToggle}>
                <button>{"<"}</button>
                <span>March 2025</span>
                <button>{">"}</button>
              </div>

              <div className={styles.dateSlider}>
                {[
                  "Thu 22nd",
                  "Fri 23rd",
                  "Sat 24th",
                  "Sun 25th",
                  "Mon 26th",
                ].map((day, index) => (
                  <div key={index} className={styles.dateDivs}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={styles.slotsContainer}>
                <div className={styles.slot}>
                  {/* TODO: Dynamic slots from backend */}
                  <span className={styles.slotSpan}>
                    <Image
                      src="/assets/sun.svg"
                      height={2}
                      width={2}
                      alt="sun"
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    Morning
                  </span>{" "}
                  <span className={styles.slotCount}>2 Slot</span>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={styles.slotButton}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.slotsContainer}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderBottom: "1px solid #D3D4DB",
                  }}
                >
                  {/* TODO: Dynamic slots from backend */}
                  <span className={styles.slotSpan}>
                    <Image
                      src="/assets/sunset.svg"
                      height={2}
                      width={2}
                      alt="sun"
                      style={{
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    Afternoon
                  </span>{" "}
                  <span className={styles.slotCount}>2 Slot</span>
                </div>

                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  {slots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSlot(slot)}
                      className={styles.slotButton}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <button className={styles.nextButton}>Next</button>
            </div>

            <Image
              src="/assets/slot-book.svg"
              alt="Doctor with Patient"
              width={500}
              height={500}
            />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
