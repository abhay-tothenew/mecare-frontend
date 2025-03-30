"use client";
import { useEffect, useState,useCallback } from "react";
import Image from "next/image";
import styles from "@/app/styles/user-profile.module.css";
import {
  Calendar,
  Clock,
  Video,
  User,
  MapPin,
  Stethoscope,
} from "lucide-react";
import { FaSpinner } from "react-icons/fa";
import { UserData, Appointment } from "./types";
import { useAuth } from "@/app/utils/context/Authcontext";
import Modal from "../components/common/Modal";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import RescheduleModal from "../components/RescheduleModal";
import ReviewModal from "../components/ReviewModal";
import { API_ENDPOINTS } from "@/app/utils/api/config";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("pending");
  const [userData, setUserData] = useState<UserData>();
  const [userAppointments, setUserAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppointmentsLoading, setIsAppointmentsLoading] = useState(true);
  const { user } = useAuth();
  const router = useRouter();
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] =
    useState<string>("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredAppointments = userAppointments.filter(
    (apt) => apt.status === activeTab
  );

  const fetchDoctorDetails = async (doctorId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_ENDPOINTS.DOCTOR_BY_ID(doctorId),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data.doctor;
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      return null;
    }
  };

  const fetchUserAppointments = useCallback(async () => {
    try {
      setIsAppointmentsLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_ENDPOINTS.APPOINTMENT_BY_ID(userData?.user_id ?? ""),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log("user appointments", data);

      const appointmentsWithDoctors = await Promise.all(
        data.appointments.map(async (appointment: Appointment) => {
          const doctorDetails = await fetchDoctorDetails(appointment.doctor_id);
          return {
            ...appointment,
            doctor: doctorDetails,
          };
        })
      );

      setUserAppointments(appointmentsWithDoctors);
    } catch (err) {
      console.log("Error fetching user appointments", err);
    } finally {
      setIsAppointmentsLoading(false);
    }
  }, [userData?.user_id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          API_ENDPOINTS.PROFILE,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("user data", data);
        setUserData(data.user);
      } catch (err) {
        console.log("Error fetching user data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData?.user_id) {
      fetchUserAppointments();
    }
  }, [userData?.user_id,fetchUserAppointments]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleReschedule = (appointmentId: string) => {
    setSelectedAppointmentId(appointmentId);
    setShowRescheduleModal(true);
  };

  const handleRescheduleSuccess = () => {
    // Refresh appointments after successful reschedule
    if (userData?.user_id) {
      fetchUserAppointments();
    }
  };

  const handleCancel = async (appointmentId: string) => {
    console.log("0000", appointmentId);
    try {
      const response = await fetch(
        API_ENDPOINTS.APPOINTMENT_BY_ID(appointmentId),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },

          body: JSON.stringify({
            status: "cancelled",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setShowDeleteModal(true);
      }
    } catch (error) {
      console.log("Error cancelling appointment:", error);
    }
  };

  const handleReview = (doctorId: string, appointmentId: string) => {
    setSelectedDoctorId(doctorId);
    setSelectedAppointmentId(appointmentId);
    setShowReviewModal(true);
  };

  const handleReviewSuccess = () => {
    // Refresh appointments after successful review
    if (userData?.user_id) {
      fetchUserAppointments();
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <FaSpinner className={styles.spinner} />
          <p>Loading profile...</p>
        </div>
      ) : (
        <>
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
                <h1>{userData?.name}</h1>
                <p>{userData?.email}</p>
                <p>{userData?.phone}</p>
              </div>
            </div>
            <button
              className={styles.editButton}
              onClick={() => {
                if (userData) {
                  const searchParams = new URLSearchParams();
                  searchParams.set("userData", JSON.stringify(userData));
                  router.push(
                    `/user-profile/editProfile?${searchParams.toString()}`
                  );
                }
              }}
            >
              Edit Profile
            </button>
          </div>

          <div className={styles.content}>
            <div className={styles.sidebar}>
              <div className={styles.infoCard}>
                <h2>Personal Information</h2>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>Age</label>
                    <p>{userData?.age}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Gender</label>
                    <p>{userData?.gender}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Blood Group</label>
                    <p>{userData?.blood_group}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Address</label>
                    <p>{userData?.address}</p>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h2>Emergency Contact</h2>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <label>Name</label>
                    <p>{userData?.emergency_name}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Relation</label>
                    <p>{userData?.emergency_relation}</p>
                  </div>
                  <div className={styles.infoItem}>
                    <label>Phone</label>
                    <p>{userData?.emergency_phone}</p>
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
                      activeTab === "pending" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("pending")}
                  >
                    Pending
                  </button>
                  <button
                    className={`${styles.tab} ${
                      activeTab === "confirmed" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("confirmed")}
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
                {isAppointmentsLoading ? (
                  <div className={styles.loadingContainer}>
                    <FaSpinner className={styles.spinner} />
                    <p>Loading appointments...</p>
                  </div>
                ) : filteredAppointments.length === 0 ? (
                  <div className={styles.noAppointments}>
                    No appointments found in this category
                  </div>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <div
                      key={appointment.appointment_id}
                      className={styles.appointmentCard}
                    >
                      <div className={styles.appointmentHeader}>
                        <div className={styles.doctorInfo}>
                          <div className={styles.doctorAvatar}>
                            {appointment.doctor?.avatar ? (
                              <Image
                                src={appointment.doctor.avatar}
                                alt={appointment.doctor.name}
                                width={40}
                                height={40}
                                className={styles.avatarImage}
                              />
                            ) : (
                              <User className={styles.defaultAvatar} size={40} />
                            )}
                          </div>
                          <div className={styles.doctorDetails}>
                            <h3>
                              {appointment.doctor?.name || "Loading doctor..."}
                            </h3>
                            <p className={styles.specialization}>
                              <Stethoscope size={14} />
                              {appointment.doctor?.specialization ||
                                "Specialization"}
                            </p>
                          </div>
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
                          <Calendar size={16} />
                          <span>{formatDate(appointment.appointment_date)}</span>
                        </div>
                        <div className={styles.detail}>
                          <Clock size={16} />
                          <span>{formatTime(appointment.appointment_time)}</span>
                        </div>
                        <div className={styles.detail}>
                          <Video size={16} />
                          <span>{appointment.appointment_type}</span>
                        </div>
                        <div className={styles.detail}>
                          <MapPin size={16} />
                          <span>MedicareHeart Institute</span>
                        </div>
                      </div>
                      {(appointment.status === "pending" ||
                        appointment.status === "confirmed") && (
                        <div className={styles.appointmentActions}>
                          <button
                            className={styles.rescheduleButton}
                            onClick={() =>
                              handleReschedule(appointment.appointment_id)
                            }
                          >
                            Reschedule
                          </button>
                          <button
                            className={styles.cancelButton}
                            onClick={() => handleCancel(appointment.appointment_id)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {appointment.status === "completed" && (
                        <div className={styles.appointmentActions}>
                          <button
                            className={styles.reviewButton}
                            onClick={() =>
                              handleReview(
                                appointment.doctor_id,
                                appointment.appointment_id
                              )
                            }
                          >
                            Give Review
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <h2>Appointment Cancelled</h2>
        <p>
          Your appointment has been successfully cancelled. You can now book a
          new appointment.
        </p>
        <div className={styles.modalButtons}>
          <Button
            text="Close"
            variant="secondary"
            onClick={() => {
              setShowDeleteModal(false);
              window.location.reload();
            }}
          />
        </div>
      </Modal>
      <RescheduleModal
        isOpen={showRescheduleModal}
        onClose={() => setShowRescheduleModal(false)}
        userId={userData?.user_id || ""}
        appointmentId={selectedAppointmentId || ""}
        onSuccess={handleRescheduleSuccess}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        doctorId={selectedDoctorId}
        appointmentId={selectedAppointmentId}
        onSuccess={handleReviewSuccess}
      />
    </div>
  );
}
