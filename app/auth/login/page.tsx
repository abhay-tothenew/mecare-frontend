import Link from "next/link";
import styles from "../../styles/login-page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <p>
          Are you a new member? <Link href="/auth/register">Sign up here</Link>
        </p>
        <div className={styles.inputContainer}>
          <p>Email</p>
          <input type="text" placeholder="Email" />

          <p>Password</p>
          <input type="password" placeholder="Password" />
        </div>
        <button className={styles.loginButton}>Login</button>
        <button className={styles.resetButton}>Reset</button>
        <p className={styles.forgotPassword} style={{ color: "#1c4a2a" }}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
}
