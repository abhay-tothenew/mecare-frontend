export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  qualification: string;
  location: string;
  image?: string;
  doctor_id: string;
  phone: string;
  about?: string;
  education?: string[];
  languages?: string[];
  availability?: string[];
  consultation_fee?: number;
  achievements?: string[];
  average_rating?: string;
}


export interface Review {
  id: string;
  doctor_id: string;
  rating: number;
  review_text: string;
}