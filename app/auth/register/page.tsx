"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "@/app/styles/register-page.module.css";
import { AtSign, LockIcon, User, Phone } from "lucide-react";
// import { registerUser } from "../../utils/api/auth/auth";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/utils/context/Authcontext";
import { API_ENDPOINTS } from "@/app/utils/api/config";

interface RegisterUser {
  displayName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();

  const user: RegisterUser = {
    displayName: name,
    name,
    email,
    password,
    phone,
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    return "";
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name: string) => {
    if (name.length < 2) return "Name must be at least 2 characters long";
    if (!/^[a-zA-Z\s]*$/.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!name) {
      newErrors.name = "Name is required";
    } else {
      const nameError = validateName(name);
      if (nameError) newErrors.name = nameError;
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    const allowedDomains = ["gmail.com", "tothenew.com"];
    const domain = user.email.split("@")[1];
    if (!allowedDomains.includes(domain)) {
      setApiError("Invalid email domain");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_type: "patient",
          display_name: user.displayName,
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        login({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
          user_id: data.user.user_id,
        });
        redirect("/home");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message);
      } else {
        setApiError("An unknown error occurred");
      }
    } finally {
      if (localStorage.getItem("token")) {
        redirect("/home");
      }
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ValidationErrors
  ) => {
    const value = e.target.value;

    switch (field) {
      case "name":
        setName(value);
        if (value) {
          const nameError = validateName(value);
          setErrors((prev) => ({ ...prev, name: nameError || undefined }));
        } else {
          setErrors((prev) => ({ ...prev, name: undefined }));
        }
        break;

      case "email":
        setEmail(value);
        if (value && !validateEmail(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: undefined }));
        }
        break;

      case "password":
        setPassword(value);
        if (value) {
          const passwordError = validatePassword(value);
          setErrors((prev) => ({
            ...prev,
            password: passwordError || undefined,
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: undefined }));
        }
        break;

      case "phone":
        setPhone(value);
        if (value && !validatePhone(value)) {
          setErrors((prev) => ({
            ...prev,
            phone: "Please enter a valid 10-digit phone number",
          }));
        } else {
          setErrors((prev) => ({ ...prev, phone: undefined }));
        }
        break;
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setErrors({});
    setApiError("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <div className={styles.header}>
          <h1>Create Account</h1>
          <p>
            Already have an account? <Link href="/auth/login">Sign in</Link>
          </p>
        </div>

        {apiError && <div className={styles.errorMessage}>{apiError}</div>}

        <div className={styles.inputContainer}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.name ? styles.inputError : ""
              }`}
            >
              <User className={styles.icon} size={18} />
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => handleInputChange(e, "name")}
                disabled={isLoading}
              />
            </div>
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.email ? styles.inputError : ""
              }`}
            >
              <AtSign className={styles.icon} size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => handleInputChange(e, "email")}
                disabled={isLoading}
              />
            </div>
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.phone ? styles.inputError : ""
              }`}
            >
              <Phone className={styles.icon} size={18} />
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => handleInputChange(e, "phone")}
                disabled={isLoading}
              />
            </div>
            {errors.phone && (
              <span className={styles.errorText}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Password</label>
            <div
              className={`${styles.inputWrapper} ${
                errors.password ? styles.inputError : ""
              }`}
            >
              <LockIcon className={styles.icon} size={18} />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => handleInputChange(e, "password")}
                disabled={isLoading}
              />
            </div>
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={`${styles.registerButton} ${
              isLoading ? styles.loading : ""
            }`}
            onClick={handleSubmit}
            // disabled={isLoading || Object.keys(errors).length > 0}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          <button
            className={styles.resetButton}
            onClick={handleReset}
            disabled={isLoading}
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
}
