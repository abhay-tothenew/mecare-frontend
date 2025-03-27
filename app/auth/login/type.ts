export interface RegisterUser {
  displayName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
}

export interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  userType?: string;
}
