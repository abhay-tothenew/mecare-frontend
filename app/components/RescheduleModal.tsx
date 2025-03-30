"use client";
import { useState, useEffect } from "react";
import Modal from "./common/Modal";
import Input from "./common/Input";
import Select from "./common/Select";
import Button from "./common/Button";
import { FaSpinner } from "react-icons/fa";
import styles from "../styles/reschedule-modal.module.css";
import { API_ENDPOINTS } from "../utils/api/config";

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  appointmentId?: string;
  onSuccess: () => void;
}

export default function RescheduleModal({
  isOpen,
  onClose,
  userId,
  appointmentId,
  onSuccess,
}: RescheduleModalProps) {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    appointment_type: "",
    appointment_date: "",
    appointment_time: "",
  });

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const response = await fetch(
          // `http://localhost:5000/api/appointments/${userId}`
          API_ENDPOINTS.APPOINTMENT_BY_ID(userId)
        );

        const data = await response.json();
        console.log("data!!!!", data);
        if (data.success) {
          setFormData({
            appointment_type: data.appointment.appointment_type,
            appointment_date: data.appointment.appointment_date,
            appointment_time: data.appointment.appointment_time,
          });
        }
      } catch (error) {
        console.error("Error fetching appointment details:", error);
      }
    };

    if (isOpen) {
      fetchAppointmentDetails();
    }
  }, [isOpen, userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_ENDPOINTS.APPOINTMENT_DETAILS(appointmentId ?? ""),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      // console.log("data", data);
      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onSuccess();
          onClose();
        }, 5000);
      }
    } catch (error) {
      console.error("Error rescheduling appointment:", error);
    } finally {
      setLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <div className={styles.successMessage}>
          <h2>Appointment Rescheduled Successfully!</h2>
          <p>Your appointment has been updated with the new details.</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.modalContent}>
        <h2>Reschedule Appointment</h2>
        <form onSubmit={handleSubmit}>
          <Select
            label="Appointment Type"
            value={formData.appointment_type}
            onChange={(e) =>
              setFormData({ ...formData, appointment_type: e.target.value })
            }
            options={[
              { value: "online", label: "Video Consultation" },
              { value: "in-person", label: "In-Person Visit" },
            ]}
            required
          />
          <Input
            type="date"
            label="Appointment Date"
            value={formData.appointment_date}
            onChange={(e) =>
              setFormData({ ...formData, appointment_date: e.target.value })
            }
            required
          />
          <Input
            type="time"
            label="Appointment Time"
            value={formData.appointment_time}
            onChange={(e) =>
              setFormData({ ...formData, appointment_time: e.target.value })
            }
            required
          />
          <div className={styles.buttonGroup}>
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <FaSpinner className={styles.spinner} />
              ) : (
                "Reschedule"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
