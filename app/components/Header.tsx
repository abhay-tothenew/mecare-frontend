"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";
import { useContext } from "react";
import AuthContext from "../utils/api/context/Authcontext";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, login, logout } = useContext(AuthContext);

  console.log("user--->",user);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const userData = JSON.stringify(user, null, 2);

  return (
    <div className={styles.headerContainer}>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer} onClick={() => router.push("/")}>
          <Image
            src="/assets/mecare_logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          <h1 className={styles.logoText}>MedCare</h1>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={handleClick}
          className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        >
          <span className={`top`}></span>
          <span className={`middle`}></span>
          <span className={`bottom`}></span>
        </button>

        {/* Navigation Links */}
        <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/home");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/appointment");
            }}
          >
            Appointments
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/health-blog");
            }}
          >
            Health Blog
          </li>
          <li
            onClick={() => {
              setIsOpen(false);
              router.push("/reviews");
            }}
          >
            Reviews
          </li>

          {/* Auth Buttons for Mobile */}
          <li className={styles.mobileAuthButtons}>
            <button
              className={styles.mobileLogin}
              onClick={() => {
                setIsOpen(false);
                router.push("/auth/login");
              }}
            >
              Login
            </button>
            <button
              className={styles.mobileRegister}
              onClick={() => {
                setIsOpen(false);
                router.push("/auth/register");
              }}
            >
              Register
            </button>
          </li>
        </ul>

        {/* Desktop Auth Buttons */}
        {/* {userData ? (
          <>
            <span className="profileIcon" onClick={() => router.push("/profile")}>👤 {user}</span>
            <button className="logout" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className="login" onClick={() => router.push("/auth/login")}>Login</button>
            <button className="register" onClick={() => router.push("/auth/register")}>Register</button>
          </>
        )} */}
        <div className={styles.authButtons}>
          <button
            className={styles.login}
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
          <button
            className={styles.register}
            onClick={() => router.push("/auth/register")}
          >
            Register
          </button>
        </div>
      </nav>
    </div>
  );
}