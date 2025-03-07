"use client";
import Image from "next/image";
import Button from "./components/Button";
import styles from "./styles/landing-page.module.css"

export default function Home() {
  return (
    <div className={styles.container}>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Health in Your Hands.</h1>
          <p>
            Take control of your healthcare with CareMate. Book appointments
            with ease, explore health blogs, and stay on top of your well-being, all in one place.
          </p>
          <Button text= "Get Started" variant="primary"/>
        </div>

        <div className={styles.heroImage}>
          <Image
            src="/assets/landing_image.png"
            alt="Doctor with Patient"
            width={500}
            height={400}
       
          />
        </div>
      </section>
    </div>
  );
}
