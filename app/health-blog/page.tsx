import Image from "next/image";
import styles from "@/app/styles/blogs-page.module.css";

interface BlogCard {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

const dummyBlogs: BlogCard[] = [
  {
    id: 1,
    title: "10 Essential Tips for Maintaining a Healthy Lifestyle",
    excerpt:
      "Discover the fundamental practices that can help you achieve and maintain optimal health in your daily life.",
    image: "https://shorturl.at/SrnVP",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Wellness",
  },
  {
    id: 2,
    title: "The Science Behind Good Sleep Habits",
    excerpt:
      "Learn about the importance of quality sleep and how it affects your overall health and well-being.",
    image: "https://shorturl.at/SrnVP",
    date: "March 14, 2024",
    readTime: "7 min read",
    category: "Sleep",
  },
  {
    id: 3,
    title: "Nutrition Guide: Building a Balanced Diet",
    excerpt:
      "A comprehensive guide to understanding nutrition and creating meals that support your health goals.",
    image: "https://shorturl.at/SrnVP",
    date: "March 13, 2024",
    readTime: "6 min read",
    category: "Nutrition",
  },
];

export default function HealthBlog() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Header Section */}
        <div className={styles.header}>
          <h1 className={styles.title}>Health & Wellness Blog</h1>
          <p className={styles.subtitle}>
            Discover insights, tips, and advice for a healthier lifestyle
          </p>
        </div>

        {/* Blog Grid */}
        <div className={styles.blogGrid}>
          {dummyBlogs.map((blog) => (
            <div key={blog.id} className={styles.blogCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className={styles.image}
                />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.metadata}>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
                <span className={styles.category}>{blog.category}</span>
                <h2 className={styles.cardTitle}>{blog.title}</h2>
                <p className={styles.excerpt}>{blog.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
