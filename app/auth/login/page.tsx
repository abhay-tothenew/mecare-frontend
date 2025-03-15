"use client";
import { useContext, useState } from "react";
import Link from "next/link";
import styles from "../../styles/login-page.module.css";
import { AtSign, LockIcon } from "lucide-react";
import { redirect } from "next/navigation";
import AuthContext from "@/app/utils/api/context/Authcontext";
import { log } from "console";

interface LoginUser {
  email: string;
  password: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user: LoginUser = {
    email,
    password,
  };

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    // e.preventDefault();

    //TODO: use utils/api/auth/auth.ts
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    // console.log("response--->", data);

    if (response.status === 200) {
      login(data.user);
      redirect("/home");
    }

    // console.log("Response-->", response);
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <p>
          Are you a new member? <Link href="/auth/register">Sign up here</Link>
        </p>
        <div className={styles.inputContainer}>
          <p>Email</p>
          <div className={styles.inputWrapper}>
            <AtSign className={styles.icon} size={18} />
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p>Password</p>
          <div className={styles.inputWrapper}>
            <LockIcon className={styles.icon} size={18} />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.loginButton} onClick={handleSubmit}>
          Login
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
        <p className={styles.forgotPassword}>Forgot Password?</p>
      </div>
    </div>
  );
}
