"use client";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "@/app/styles/confirm-details.module.css";
import { useState, useEffect } from "react";
import Footer from "@/app/components/Footer";
import Button from "@/app/components/common/Button";
import Input from "@/app/components/common/Input";
import Select from "@/app/components/common/Select";
import TextArea from "@/app/components/common/TextArea";
import Card from "@/app/components/common/Card";

interface AppointmentDetails {
  doctor: {
    name: string;
    specialty: string;
  };
  appointment: {
    date: string;
    time: string;
    type: string;
    location: {
      name: string;
      address: string;
    };
  };
}

export default function ConfirmDetails() {
  const router = useRouter();
  const [appointmentDetails, setAppointmentDetails] =
    useState<AppointmentDetails | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    healthProblem: "",
  });

  const searchParams = useSearchParams();
  const details = searchParams.get("details");
  let detailsObject = null;
  if (details) {
    detailsObject = JSON.parse(details);
    console.log("details-->", detailsObject);
  }

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

    const fullAppointmentData = {
      ...appointmentDetails,
      patient: formData,
    };

    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: '384c86d0-8b8a-4e6e-ad98-fb6c158d1cb4',
          doctor_id: detailsObject.id,
          appointment_type: detailsObject.type === "Video Consultation" ? "online" : "in-person",
          appointment_date: detailsObject.date,
          appointment_time: detailsObject.time,
        }),
      });

      const data = await response.json();
      console.log('response--->',data );

     if(response.status === 201){
      console.log("Submitted appointment details", response);
      console.log("Full appointment data:", fullAppointmentData);

      router.push("/appointment/success");
     }else{
      throw new Error("Failed to submit appointment details");
     }
    } catch (error) {
      console.log("Error submitting appointment details", error);
    }
  };

  if (!details) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          backgroundColor: "#1c4a2a",
          color: "white",
        }}
      >
        Loading...
      </div>
    );
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
      <Footer />
    </>
  );
}
