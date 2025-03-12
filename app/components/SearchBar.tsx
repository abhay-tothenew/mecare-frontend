import styles from "../styles/home.module.css";

export default function SearchBar() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroSection}>
        <p className={styles.heroText}>Find a doctor at your own ease</p>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search doctors" aria-label="Search for doctors" />
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>
    </section>
  );
}