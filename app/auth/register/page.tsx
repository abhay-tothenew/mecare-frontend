import Link from "next/link";
import styles from "../../styles/register-page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faEnvelope,
  faUser,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  return (
    <div className={styles.container}>
      <div className={styles.registerContainer}>
        <h1>Register</h1>
        <p>
          Already a member? <Link href="/auth/login">Login</Link>
        </p>
        <div className={styles.inputContainer}>
          <p>Role</p>
          <select className={styles.roleDropdown}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
          </select>
          <p>Name</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faUser} className={styles.icon} /> */}
            <input type="text" placeholder="Full Name" />
          </div>

          <p>Email</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faEnvelope} className={styles.icon} /> */}
            <input type="text" placeholder="Email" />
          </div>

          <p>Phone</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faPhone} className={styles.icon} /> */}
            <input type="text" placeholder="Phone Number" />
          </div>

          <p>Password</p>
          <div className={styles.inputWrapper}>
            {/* <FontAwesomeIcon icon={faLock} className={styles.icon} /> */}
            <input type="password" placeholder="Password" />
          </div>
        </div>
        <button className={styles.registerButton}>Submit</button>
        <button className={styles.resetButton}>Reset</button>
      </div>
    </div>
  );
}
