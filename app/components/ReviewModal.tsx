import React, { useState } from "react";
import Modal from "./common/Modal";
import Button from "./Button";
import styles from "@/app/styles/ReviewModal.module.css";
import { useAuth } from "@/app/utils/context/Authcontext";
import { API_ENDPOINTS } from "../utils/api/config";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string;
  appointmentId?: string;
  onSuccess: () => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  doctorId,
  appointmentId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  console.log(appointmentId);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    console.log("review", review);
    console.log("rating", rating);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(API_ENDPOINTS.REVIEWS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id: user?.user_id,
          doctor_id: doctorId,
          rating,
          review_text: review,
        }),
      });

      const data = await response.json();
      console.log("review data", data);

      if (data.success) {
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2>Rate Your Experience</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.ratingContainer}>
          <label>Rating</label>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`${styles.star} ${
                  star <= rating ? styles.active : ""
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className={styles.reviewContainer}>
          <label>Review (Optional)</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with the doctor..."
            rows={4}
          />
        </div>
        <div className={styles.modalButtons}>
          <Button
            text="Cancel"
            variant="secondary"
            onClick={onClose}
            disabled={isSubmitting}
          />
          <Button
            text="Submit Review"
            onClick={handleSubmit}
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ReviewModal;
