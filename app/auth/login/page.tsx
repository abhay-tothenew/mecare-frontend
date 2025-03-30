"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/login-page.module.css";
import { AtSign, LockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/utils/context/Authcontext";
import { API_ENDPOINTS } from "@/app/utils/api/config";
import Image from "next/image";

interface LoginUser {
  email: string;
  password: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [apiError, setApiError] = useState("");
  const { login } = useAuth();

  const user: LoginUser = {
    email,
    password,
  };

  // const { login } = useContext(AuthContext);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    // if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    return "";
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const passwordError = validatePassword(password);
      if (passwordError) {
        newErrors.password = passwordError;
      }
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
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.token && data.success) {
        localStorage.setItem("token", data.token);
        
        login({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          token: data.token,
          user_id: data.user.user_id,
        });

        console.log("user data", data);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setApiError(err.message || "An error occurred during login");
      } else {
        setApiError("An error occurred during login");
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
    field: "email" | "password"
  ) => {
    const value = e.target.value;
    if (field === "email") {
      setEmail(value);
      if (value && !validateEmail(value)) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prev) => ({ ...prev, email: undefined }));
      }
    } else {
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
    }
  };

  const handleGoogleLogin = () => {
    redirect(API_ENDPOINTS.GOOGLE_AUTH);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
    setApiError("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <p>
          Are you a new member? <Link href="/auth/register">Sign up here</Link>
        </p>

        {apiError !== "NEXT_REDIRECT" && (
          <p className={styles.error}>{apiError}</p>
        )}

        <div className={styles.inputContainer}>
          <p>Email</p>
          <div
            className={`${styles.inputWrapper} ${
              errors.email ? styles.inputError : ""
            }`}
          >
            <AtSign className={styles.icon} size={18} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <span className={styles.errorText}>{errors.email}</span>
          )}

          <p>Password</p>
          <div
            className={`${styles.inputWrapper} ${
              errors.password ? styles.inputError : ""
            }`}
          >
            <LockIcon className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handleInputChange(e, "password")}
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <span className={styles.errorText}>{errors.password}</span>
          )}
        </div>

        <button
          className={`${styles.loginButton} ${isLoading ? styles.loading : ""}`}
          onClick={handleSubmit}
          // disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <button
          className={styles.resetButton}
          onClick={handleReset}
          disabled={isLoading}
        >
          Reset
        </button>

        <div className={styles.divider}>
          <p>OR</p>
        </div>

        <button className={styles.googleButton} onClick={handleGoogleLogin}>
          <Image
            src="/assets/google_logo.svg"
            alt="Google Logo"
            width={40}
            height={40}
            className={styles.googleIcon}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
