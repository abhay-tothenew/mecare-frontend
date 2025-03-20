export const validateFullName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const validateAge = (age: string): boolean => {
  const numAge = parseInt(age);
  return !isNaN(numAge) && numAge > 0 && numAge < 150;
};

export const validatePhoneNumber = (phone: string): boolean => {
  return /^\d{10}$/.test(phone);
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}; 