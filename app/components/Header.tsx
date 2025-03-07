"use client";
import Image from "next/image";
import styles from "../styles/landing-page.module.css";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter();
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          {/* TODO: ADD IN MODULE CSS */}
          <div className={styles.nav_container}>
            <Image
              src="/assets/mecare_logo.png"
              alt="Logo"
              width={40}
              height={40}
              onClick={() => router.push("/")}
              style={{
                cursor: "pointer",
              }}
            />

            <h1>MedCare</h1>
          </div>
          <ul className={styles.navLinks}>
            <li onClick={() => router.push("/home")}>Home</li>
            <li onClick={() => router.push("/appointment")}>Appointments</li>
            <li onClick={() => router.push("/health-blog")}>Health Blog</li>
            <li onClick={() => router.push("/reviews")}>Reviews</li>
          </ul>
        </div>
        <div className={styles.authButtons}>
            {/* TODO: use reusable button */}

            {/* <Button text = "Login" variant="primary" className="styles.login"/> */}
          <button className={styles.login} onClick={() => router.push("/auth/login")}>Login</button>
          <button className={styles.register} onClick={() => router.push("/auth/register")}>Register</button>
        </div>
      </nav>
    </div>
  );
}
