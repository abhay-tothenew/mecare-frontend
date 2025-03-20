"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "@/app/styles/user-profile.module.css";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "completed" | "cancelled";
  location: string;
}

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock user data - in a real app, this would come from your backend
  const userData = {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    age: 32,
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main Street, New York, NY 10001",
    emergencyContact: {
      name: "Jane Smith",
      relation: "Spouse",
      phone: "+1 (555) 987-6543",
    },
  };

  // Mock appointments data
  const appointments: Appointment[] = [
    {
      id: "1",
      doctorName: "Dr. Emily Brown",
      specialty: "Pediatrics",
      date: "22 Dec 2023",
      time: "9:00 AM",
      type: "Video Consultation",
      status: "upcoming",
      location: "MedicareHeart Institute",
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiology",
      date: "15 Dec 2023",
      time: "2:30 PM",
      type: "Hospital Visit",
      status: "completed",
      location: "MedicareHeart Institute",
    },
    {
      id: "3",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Dermatology",
      date: "10 Dec 2023",
      time: "11:00 AM",
      type: "Video Consultation",
      status: "cancelled",
      location: "MedicareHeart Institute",
    },
  ];

  const filteredAppointments = appointments.filter(
    (apt) => apt.status === activeTab
  );

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <div className={styles.profileInfo}>
          <div className={styles.avatar}>
            <Image
              src="/assets/user-avatar.svg"
              alt="Profile"
              width={100}
              height={100}
            />
          </div>
          <div className={styles.userInfo}>
            <h1>{userData.name}</h1>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
          </div>
        </div>
        <button className={styles.editButton}>Edit Profile</button>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <div className={styles.infoCard}>
            <h2>Personal Information</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Age</label>
                <p>{userData.age}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Gender</label>
                <p>{userData.gender}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Blood Group</label>
                <p>{userData.bloodGroup}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Address</label>
                <p>{userData.address}</p>
              </div>
            </div>
          </div>

          <div className={styles.infoCard}>
            <h2>Emergency Contact</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <label>Name</label>
                <p>{userData.emergencyContact.name}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Relation</label>
                <p>{userData.emergencyContact.relation}</p>
              </div>
              <div className={styles.infoItem}>
                <label>Phone</label>
                <p>{userData.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.appointmentsHeader}>
            <h2>My Appointments</h2>
            <div className={styles.tabs}>
              <button
                className={`${styles.tab} ${
                  activeTab === "upcoming" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("upcoming")}
              >
                Upcoming
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "completed" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Past
              </button>
              <button
                className={`${styles.tab} ${
                  activeTab === "cancelled" ? styles.active : ""
                }`}
                onClick={() => setActiveTab("cancelled")}
              >
                Cancelled
              </button>
            </div>
          </div>

          <div className={styles.appointmentsList}>
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className={styles.appointmentCard}>
                <div className={styles.appointmentHeader}>
                  <div className={styles.doctorInfo}>
                    <h3>{appointment.doctorName}</h3>
                    <p>{appointment.specialty}</p>
                  </div>
                  <div className={styles.appointmentType}>
                    <span
                      className={`${styles.badge} ${
                        styles[appointment.status]
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
                <div className={styles.appointmentDetails}>
                  <div className={styles.detail}>
                    <Image
                      src="/assets/calendar.svg"
                      alt="Date"
                      width={16}
                      height={16}
                    />
                    <span>{appointment.date}</span>
                  </div>
                  <div className={styles.detail}>
                    <Image
                      src="/assets/clock.svg"
                      alt="Time"
                      width={16}
                      height={16}
                    />
                    <span>{appointment.time}</span>
                  </div>
                  <div className={styles.detail}>
                    <Image
                      src="/assets/location.svg"
                      alt="Location"
                      width={16}
                      height={16}
                    />
                    <span>{appointment.location}</span>
                  </div>
                  <div className={styles.detail}>
                    <Image
                      src="/assets/video-call.svg"
                      alt="Type"
                      width={16}
                      height={16}
                    />
                    <span>{appointment.type}</span>
                  </div>
                </div>
                {appointment.status === "upcoming" && (
                  <div className={styles.appointmentActions}>
                    <button className={styles.rescheduleButton}>
                      Reschedule
                    </button>
                    <button className={styles.cancelButton}>Cancel</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}