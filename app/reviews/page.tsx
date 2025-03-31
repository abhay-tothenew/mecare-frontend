"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/utils/context/Authcontext";
import { Star } from "lucide-react";
import styles from "@/app/styles/reviews-page.module.css";
import { API_ENDPOINTS } from "../utils/api/config";
import { Review, Doctor, Rating } from "./type";
import { FaSpinner } from "react-icons/fa";
import Modal from "@/app/components/common/Modal";
import { useRouter } from "next/navigation";

export default function Reviews() {
  const { user } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [doctors, setDoctors] = useState<{ [key: string]: Doctor }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (!user?.user_id || !user?.token) {
      setShowLoginModal(true);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          API_ENDPOINTS.REVIEWS_BY_USER(user.user_id as string),
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        console.log("review page", data);
        setReviews(data.review);
        setRatings(data.review.rating);

        // Fetch doctor details for each review
        const doctorPromises = data?.review.map(async (review: Review) => {
          const doctorResponse = await fetch(
            API_ENDPOINTS.DOCTOR_BY_ID(review.doctor_id)
          );
          if (!doctorResponse.ok) {
            throw new Error(
              `Failed to fetch doctor details for ${review.doctor_id}`
            );
          }
          const doctorData = await doctorResponse.json();
          return { [review.doctor_id]: doctorData };
        });

        const doctorResults = await Promise.all(doctorPromises);
        const doctorMap = doctorResults.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {}
        );
        setDoctors(doctorMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user?.user_id, user?.token]);
  console.log(ratings);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <FaSpinner className={styles.spinner} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div>
          <h2 className={styles.errorTitle}>Error</h2>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div>
          <h2 className={styles.emptyTitle}>No Reviews Yet</h2>
          <p className={styles.emptyMessage}>
            You haven&apos;t written any reviews yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Your Reviews</h1>
        <div className={styles.reviewsGrid}>
          {reviews.map((review) => (
            <div key={review.review_id} className={styles.reviewCard}>
              <div className={styles.reviewHeader}>
                <h2 className={styles.doctorName}>
                  {doctors[review.doctor_id].doctor?.name || "Loading..."}
                </h2>
                <div className={styles.starsContainer}>
                  {reviews.map((rating, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className={styles.reviewComment}>{review.review_text}</p>
              <p className={styles.reviewDate}>
                {new Date(review.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <h2>Login Required</h2>
        <p>Please login to view your reviews.</p>
        <div className={styles.modalButtons}>
          <button
            className={styles.cancelButton}
            onClick={() => setShowLoginModal(false)}
          >
            Cancel
          </button>
          <button
            className={styles.submitButton}
            onClick={() => router.push("/auth/login")}
          >
            Login
          </button>
        </div>
      </Modal>
    </>
  );
}
