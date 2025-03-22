export interface AppointmentDetails {
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
