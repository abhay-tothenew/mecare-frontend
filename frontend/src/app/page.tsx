import styles from './page.module.css'
import ResponsiveContainer from '@/components/layouts/ResponsiveContainer'

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <ResponsiveContainer>
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>Your Health, Our Priority</h1>
              <p className={styles.subtitle}>
                Connect with top healthcare professionals and book appointments with ease.
              </p>
              <div className={styles.buttonGroup}>
                <button className={styles.primaryButton}>Book Appointment</button>
                <button className={styles.secondaryButton}>Find a Doctor</button>
              </div>
            </div>
            <div className={styles.heroImage}>
              {/* Add an image here */}
            </div>
          </div>
        </ResponsiveContainer>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <ResponsiveContainer>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
              </div>
            ))}
          </div>
        </ResponsiveContainer>
      </section>
    </main>
  )
}

const features = [
  {
    title: "24/7 Support",
    description: "Access medical support anytime, anywhere with our round-the-clock service."
  },
  {
    title: "Easy Booking",
    description: "Book appointments with just a few clicks through our user-friendly platform."
  },
  {
    title: "Expert Doctors",
    description: "Connect with verified and experienced healthcare professionals."
  }
]; 