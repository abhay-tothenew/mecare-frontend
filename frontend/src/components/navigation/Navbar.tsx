'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'
import ResponsiveContainer from '../layouts/ResponsiveContainer'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className={styles.navbar}>
      <ResponsiveContainer>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            MeCare
          </Link>

          <button 
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={styles.menuIcon}></span>
          </button>

          <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
            <Link href="/doctors" className={styles.navLink}>Find Doctors</Link>
            <Link href="/appointment" className={styles.navLink}>Book Appointment</Link>
            <Link href="/emergency" className={styles.navLink}>Emergency</Link>
            <Link href="/auth/signin" className={styles.signInButton}>Sign In</Link>
          </div>
        </div>
      </ResponsiveContainer>
    </nav>
  )
} 