export interface Review {
  review_id: string;
  rating: number;
  review_text: string;
  doctor_id: string;
  created_at: string;
  average_rating: number;
}

export interface doctor {
  doctor_id: string;
  name: string;
}
export interface Doctor {
  doctor?: doctor;
}

export interface Rating {
  rating: number;
}
