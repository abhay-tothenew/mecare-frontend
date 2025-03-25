"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "../../styles/register-page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import { registerUser } from "../../utils/api/auth/auth";
import { redirect } from "next/navigation";
import { useAuth } from "@/app/utils/context/Authcontext";

interface RegisterUser {
  displayName: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  userType: string;
}

export default function Register() {
  // const [displayName, setDisplayName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("patient");
  const {login } = useAuth();
  const user: RegisterUser = {
    displayName: name,
    name,
    email,
    password,
    phone,
    userType,
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    // const response = await registerUser(user);

    //TODO: use utils/api/auth/auth.ts
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_type: user.userType,
        display_name: user.displayName,
        name: user.name,
        email: user.email,
        phone: user.phone,
        password: user.password,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error("Failed to register user");
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

    redirect("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h1>Register</h1>
        <p>
          Already a member? <Link href="/auth/login">Login</Link>
        </p>
        <div className={styles.inputContainer}>
          <p>Role</p>
          <select
            className={styles.roleDropdown}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option>Select Role</option>
            <option value="patient">Patient</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
          </select>
          <p>Name</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faUser} className={styles.icon} /> */}
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <p>Email</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> */}
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p>Phone</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faPhone} className={styles.icon} /> */}
            <input
              type="text"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <p>Password</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faLock} className={styles.icon} /> */}
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.registerButton} onClick={handleSubmit}>
          Submit
        </button>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
}
