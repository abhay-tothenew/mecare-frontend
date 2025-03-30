import { API_ENDPOINTS } from "./config";

interface Appointment {
  appointment_id: string;
  doctor_id: string;
  user_id: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

interface OverlapCheckResult {
  hasOverlap: boolean;
  message: string;
}

export const checkOverlappingAppointments = async (
  doctorId: string,
  selectedDate: string,
  selectedTime: string,
  userId: string
): Promise<OverlapCheckResult> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(API_ENDPOINTS.APPOINTMENTS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const appointments: Appointment[] = await response.json();
    
    // Check if user already has an appointment with this doctor at this time
    const userDoctorOverlap = appointments.some(
      (appointment) =>
        appointment.doctor_id === doctorId &&
        appointment.user_id === userId &&
        (appointment.status === "pending" || appointment.status === "confirmed") &&
        appointment.appointment_date === selectedDate &&
        appointment.appointment_time === selectedTime
    );

    if (userDoctorOverlap) {
      return {
        hasOverlap: true,
        message: "You already have an appointment with this doctor at this date and time. Please choose another slot."
      };
    }

    // Check if doctor is already booked at this time by any user
    const doctorTimeOverlap = appointments.some(
      (appointment) =>
        appointment.doctor_id === doctorId &&
        (appointment.status === "pending" || appointment.status === "confirmed") &&
        appointment.appointment_date === selectedDate &&
        appointment.appointment_time === selectedTime
    );

    if (doctorTimeOverlap) {
      return {
        hasOverlap: true,
        message: "This time slot is already booked by another patient. Please choose another slot."
      };
    }

    // Check if user already has an appointment with this doctor at any time
    const userDoctorAnyTimeOverlap = appointments.some(
      (appointment) =>
        appointment.doctor_id === doctorId &&
        appointment.user_id === userId &&
        (appointment.status === "pending" || appointment.status === "confirmed")
    );

    if (userDoctorAnyTimeOverlap) {
      return {
        hasOverlap: true,
        message: "You already have an appointment with this doctor. Please wait for your current appointment to complete or cancel it before booking a new one."
      };
    }

    return {
      hasOverlap: false,
      message: ""
    };
  } catch (error) {
    console.error("Error checking overlapping appointments:", error);
    throw error;
  }
};
