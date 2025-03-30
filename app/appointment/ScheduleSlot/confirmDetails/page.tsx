"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/styles/confirm-details.module.css";
import { useState, useEffect, Suspense } from "react";
import Footer from "@/app/components/Footer";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import Select from "@/app/components/common/Select";
import TextArea from "@/app/components/common/TextArea";
import Card from "@/app/components/common/Card";
import Modal from "@/app/components/common/Modal";
import {
  validateFullName,
  validateAge,
  validatePhoneNumber,
  validateEmail,
} from "@/app/utils/validation";
import { useAuth } from "@/app/utils/context/Authcontext";
import { API_ENDPOINTS } from "@/app/utils/api/config";

function ConfirmDetailsContent() {
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    healthProblem: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    age: "",
    phoneNumber: "",
    email: "",
  });

  const searchParams = useSearchParams();
  const details = searchParams.get("details");
  let detailsObject = null;
  if (details) {
    detailsObject = JSON.parse(details);
    console.log("details-->", detailsObject);
  }

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem("userID");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, []);

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      fullName: "",
      age: "",
      phoneNumber: "",
      email: "",
    };

    if (!validateFullName(formData.fullName)) {
      newErrors.fullName = "Full Name is required.";
      valid = false;
    }

    if (!validateAge(formData.age)) {
      newErrors.age = "Please enter a valid age.";
      valid = false;
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number.";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!validateForm()) {
      return;
    }

    const fullAppointmentData = {
      patient: formData,
    };

    console.log("Full appointment data:", fullAppointmentData);

    try {
      const response = await fetch(API_ENDPOINTS.APPOINTMENTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          user_id: userId || '', // Handle case where userId might be null
          doctor_id: detailsObject?.id,
          appointment_date: detailsObject?.date,
          appointment_time: detailsObject?.time,
          appointment_type:
            detailsObject?.type === "Video Consultation"
              ? "online"
              : "in-person",
          patient_name: fullAppointmentData.patient.fullName,
          patient_gender: fullAppointmentData.patient.gender,
          patient_age: fullAppointmentData.patient.age,
          phone_number: fullAppointmentData.patient.phoneNumber,
          patient_email: fullAppointmentData.patient.email,
          health_description: fullAppointmentData.patient.healthProblem,
        }),
      });

      const data = await response.json();
      console.log("Appointment data:", data);

      if (data.success) {
        router.push("/appointment/success");
      } else {
        setErrorMessage(data.error);
        setShowErrorModal(true);
        return;
      }
    } catch (error) {
      console.log("Error submitting appointment:", error);
    }
  };

  if (!details) {
    return <div>Loading...</div>;
  }

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button variant="text" onClick={() => router.back()}>
            ← Back to Appointment Booking
          </Button>
          <h1>Confirm Appointment Details</h1>
        </div>

        <div className={styles.content}>
          <Card title="Appointment Summary">
            <div className={styles.summaryGrid}>
              <div>
                <label>Doctor</label>
                <p>{detailsObject.name}</p>
                <span>{detailsObject.specialty}</span>
              </div>
              <div>
                <label>Date & Time</label>
                <p>{detailsObject.date}</p>
                <span>{detailsObject.time}</span>
              </div>
              <div>
                <label>Appointment Type</label>
                <p>{detailsObject.type}</p>
              </div>
              <div>
                <label>Location</label>
                <p>{detailsObject.location.name}</p>
                <span>{detailsObject.location.address}</span>
              </div>
            </div>
          </Card>

          <form onSubmit={handleSubmit} className={styles.form}>
            <h2>Patient Information</h2>

            <Input
              label="Full Name"
              name="fullName"
              placeholder="Enter patient's full name"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              fullWidth
              error={errors.fullName}
            />

            <div className={styles.formRow}>
              <Input
                label="Age"
                name="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleInputChange}
                required
                error={errors.age}
              />
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                options={genderOptions}
              />
            </div>

            <Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
              fullWidth
              error={errors.phoneNumber}
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleInputChange}
              required
              fullWidth
              error={errors.email}
            />

            <TextArea
              label="Health Problem (Optional)"
              name="healthProblem"
              placeholder="Briefly describe your health problem"
              value={formData.healthProblem}
              onChange={handleInputChange}
              rows={4}
              fullWidth
            />

            <Button type="submit" variant="primary" fullWidth>
              Confirm Appointment
            </Button>

            <p className={styles.terms}>
              By confirming this appointment, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2>Login Required</h2>
        <p>Please login to book an appointment.</p>
        <div className={styles.modalButtons}>
          <Button variant="text" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => router.push("/auth/login")}>
            Login
          </Button>
        </div>
      </Modal>

      <Modal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}>
        <h2>Cannot Book Appointment</h2>
        <p>{errorMessage}</p>
        <div className={styles.modalButtons}>
          <Button variant="primary" onClick={() => setShowErrorModal(false)}>
            OK
          </Button>
        </div>
      </Modal>

      <Footer />
    </>
  );
}

export default function ConfirmDetails() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmDetailsContent />
    </Suspense>
  );
}
