"use client";
import Image from "next/image";
import styles from "@/app/styles/schedule-card.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer";
import { redirect, useRouter } from "next/navigation";
import { use } from "react";
import { Appointment, Doctor, PageParams } from "./type";

export default function ScheduleSlot({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { doctorId } = resolvedParams;
  const [selectedSlot, setSelectedSlot] = useState("");
  const [doctorDetails, setDoctorDetails] = useState<Doctor>();
  const [selectedTab, setSelectedTab] = useState("video");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(
    "MedicareHeart Institute, Okhla Road"
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [activeTimeSection, setActiveTimeSection] = useState<
    "morning" | "evening"
  >("morning");

  useEffect(() => {
    const fetchDoctorById = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/doctors/${doctorId}`
        );
        const data = await response.json();
        console.log("doctor details", data);
        setDoctorDetails(data.doctor);

        // console.log("doctor details-->", doctorDetails);
      } catch (err) {
        console.log("Error fetching doctor details", err);
      }
    };

    fetchDoctorById();
  }, [doctorId]);

  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 weeks * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    setCalendarDays(days);
  }, [currentMonth]);

  // Fetch Appointments for Selected Doctor
  useEffect(() => {
    if (!doctorId) return;

    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/appointments/${doctorId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        console.log("response-----", data);

        setAppointments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorId]);

  const generateTimeSlots = () => {
    const morningSlots = [];
    const eveningSlots = [];

    for (let hour = 9; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        morningSlots.push(time);
      }
    }

    for (let hour = 14; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        eveningSlots.push(time);
      }
    }

    return { morningSlots, eveningSlots };
  };

  const { morningSlots, eveningSlots } = generateTimeSlots();

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Prevent selecting past dates
    if (date < today) return false;

    const dateStr = formatDate(date);
    // Show all future dates as available
    return true;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  // Filter available slots based on selected date and time section
  const availableSlots = (morningSlots: string[], eveningSlots: string[]) => {
    // Get all booked appointments for the selected date
    const bookedAppointments = appointments
      .filter(
        (appt) =>
          appt.appointment_date.startsWith(selectedDate) &&
          (appt.status === "confirmed" || appt.status === "pending")
      )
      .map((appt) => appt.appointment_time);

    const slots = activeTimeSection === "morning" ? morningSlots : eveningSlots;

    return slots.map((time) => ({
      time,
      available: !bookedAppointments.includes(time),
    }));
  };

  const handleNext = () => {
    if (!selectedSlot || !selectedDate || !doctorDetails) return;

    const appointmentDetails = {
      id: doctorId,
      name: doctorDetails.name,
      specialty: doctorDetails.specialization,
      date: selectedDate,
      time: selectedSlot,
      type: selectedTab === "video" ? "Video Consultation" : "Hospital Visit",
      location: {
        name: selectedLocation,
        address: doctorDetails.location,
      },
    };


    const encodedDetails = encodeURIComponent(
      JSON.stringify(appointmentDetails)
    );

    console.log("doctor details", encodedDetails);
    router.push(
      `/appointment/ScheduleSlot/confirmDetails?details=${encodedDetails}`
    );
  };

  const handleMonthChange = (increment: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + increment);

    // Prevent going back before current month
    const today = new Date();
    if (
      increment < 0 &&
      newDate.getMonth() === today.getMonth() &&
      newDate.getFullYear() === today.getFullYear()
    ) {
      return;
    }

    setCurrentMonth(newDate);
  };

  return (
    <>
      <div className={styles.container}>
        <section className={styles.hero}>
          <div className={styles.heroText}>
            <h1>Book Your Next Doctor Visit in Seconds.</h1>
            <p>
              Find the best doctor for your needs and schedule an appointment
              instantly.
            </p>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.bookingCard}>
              <div className={styles.cardHeader}>
                <h2>Schedule Appointment</h2>
                <div className={styles.tabToggle}>
                  <button
                    className={`${styles.tab} ${
                      selectedTab === "video" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedTab("video")}
                  >
                    Video
                  </button>
                  <button
                    className={`${styles.tab} ${
                      selectedTab === "hospital" ? styles.active : ""
                    }`}
                    onClick={() => setSelectedTab("hospital")}
                  >
                    Hospital
                  </button>
                </div>
              </div>

              <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                  <button
                    onClick={() => handleMonthChange(-1)}
                    disabled={
                      currentMonth.getMonth() === new Date().getMonth() &&
                      currentMonth.getFullYear() === new Date().getFullYear()
                    }
                  >
                    ←
                  </button>
                  <h3>
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <button onClick={() => handleMonthChange(1)}>→</button>
                </div>
                <div className={styles.calendarGrid}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div key={day} className={styles.calendarDayHeader}>
                        {day}
                      </div>
                    )
                  )}
                  {calendarDays.map((date, index) => (
                    <button
                      key={index}
                      className={`${styles.calendarDay} ${
                        !isCurrentMonth(date) ? styles.otherMonth : ""
                      } ${
                        formatDate(date) === selectedDate ? styles.selected : ""
                      } ${
                        isDateAvailable(date)
                          ? styles.available
                          : styles.unavailable
                      }`}
                      onClick={() => setSelectedDate(formatDate(date))}
                      disabled={!isDateAvailable(date)}
                    >
                      {date.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.slotsContainer}>
                <div className={styles.timeSectionToggle}>
                  <button
                    className={`${styles.timeSectionButton} ${
                      activeTimeSection === "morning" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTimeSection("morning")}
                  >
                    Morning
                  </button>
                  <button
                    className={`${styles.timeSectionButton} ${
                      activeTimeSection === "evening" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTimeSection("evening")}
                  >
                    Evening
                  </button>
                </div>
                <h3>Available Slots</h3>
                {loading ? (
                  <p>Loading slots...</p>
                ) : !selectedDate ? (
                  <p>Please select a date first.</p>
                ) : (
                  <div className={styles.timeSlots}>
                    {availableSlots(morningSlots, eveningSlots).map(
                      (slot, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSlot(slot.time)}
                          className={`${styles.timeSlot} ${
                            selectedSlot === slot.time ? styles.selected : ""
                          }`}
                          disabled={!slot.available}
                        >
                          {slot.time}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              <button
                className={styles.nextButton}
                disabled={!selectedSlot || !selectedDate}
                onClick={handleNext}
              >
                Next
              </button>
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
