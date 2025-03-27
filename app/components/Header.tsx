"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import styles from "../styles/Header.module.css";
import { useAuth } from "../utils/context/Authcontext";

export default function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    user_id: string;
  } | null>(null);

  let token = localStorage.getItem("token");
  const { user, logout, login } = useAuth();

  // const handleAuthData = (data: any, token: string) => {
  //   console.log("handleAuthData", data);
  //   login({
  //     id: token,
  //     name: userData?.name || "",
  //     email: userData?.email || "",
  //     token: token,
  //     user_id: userData?.user_id || "",
  //   });
  // };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("header user data", data);
        if (localStorage.getItem("userID") != data.user.user_id) {
          localStorage.setItem("userID", data.user.user_id);
        }

        // if (token) {
        //   handleAuthData(data, token);
        // }
        setUserData(data.user);
      } catch (err) {
        console.log("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const google_login = localStorage.getItem("google_login");

    console.log("google_login", google_login);
  }, []);

  const handleLogout = () => {
    logout();
    location.reload();
    redirect("/");
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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
          {userData ? (
            <li className={styles.mobileAuthButtons}>
              <button
                className={styles.mobileLogin}
                onClick={() => {
                  setIsOpen(false);
                  router.push("/user-profile");
                }}
              >
                My Profile
              </button>

              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
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
          )}
        </ul>

        {/* Desktop Auth Buttons */}
        <div className={styles.authButtons}>
          {userData ? (
            <>
              <span
                className={styles.profileIcon}
                onClick={() => router.push("/user-profile")}
              >
                👤 {userData.name}
              </span>
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
