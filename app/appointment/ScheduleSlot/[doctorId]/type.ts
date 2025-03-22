export interface Appointment {
  appointment_date: string;
  appointment_time: string;
  status: string;
  appointment_type: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  qualification: string;
  location: string;
  image?: string;
  doctor_id: string;
  phone: string;
}

export interface PageParams {
  doctorId: string;
  doctorDetails: Doctor;
  appointmentDetails: Appointment;
}