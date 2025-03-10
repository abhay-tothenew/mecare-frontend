import Link from "next/link";
import styles from "../../styles/login-page.module.css";
import { AtSign, LockIcon } from "lucide-react";

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
          <div className={styles.inputWrapper}>
            <AtSign className={styles.icon} size={18} />
            <input type="text" placeholder="Email" />
          </div>
          <p>Password</p>
          <div className={styles.inputWrapper}>
            <LockIcon className={styles.icon} size={18}/>
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <button className={styles.loginButton}>Login</button>
        <button className={styles.resetButton}>Reset</button>
        <p className={styles.forgotPassword}>Forgot Password?</p>
      </div>
    </div>
  );
}
