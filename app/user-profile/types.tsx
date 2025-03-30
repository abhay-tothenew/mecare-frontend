export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  avatar?: string;
}

export interface Appointment {
  id: number;
  appointment_id: string;
  doctor_id: string;
  user_id: string;
  slot_id: number;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  team_id: string | null;
  created_at: string;
  doctor?: Doctor;
}

export interface UserData {
  id: number;
  display_name: string;
  name: string;
  email: string;
  phone: string;
  user_type: string;
  user_id: string;
  avatar?: string;
  age: number;
  gender: string;
  blood_group: string;
  address: string;
  emergency_name: string;
  emergency_relation: string;
  emergency_phone: string;
}