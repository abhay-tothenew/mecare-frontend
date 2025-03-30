"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";
import styles from "@/app/styles/user-profile.module.css";
import { UserData } from "../types";
import Input from "@/app/components/common/Input";
import Select from "@/app/components/common/Select";
import TextArea from "@/app/components/common/TextArea";
import Button from "@/app/components/common/Button";
import { API_ENDPOINTS } from "@/app/utils/api/config";



export default function EditProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(API_ENDPOINTS.PROFILE, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("user data", data);
        setUserData(data.user);
        // setFormData(data.user);
      } catch (err) {
        console.log("Error fetching user data", err);
      }
    };

    fetchUserData();
  }, []);

  console.log("user data", userData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setUserData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        API_ENDPOINTS.USERS(userData?.user_id ?? ""),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      router.push("/user-profile");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.profileHeader}>
        <h1>Edit Profile</h1>
        <Button variant="outline" onClick={() => router.push("/user-profile")}>
          Back to Profile
        </Button>
      </div>

      <form onSubmit={handleSubmit} className={styles.editForm}>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formSection}>
          <h2>Personal Information</h2>
          <div className={styles.formGrid}>
            <Input
              label="Full Name"
              id="name"
              name="name"
              value={userData?.name || ""}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              id="email"
              name="email"
              value={userData?.email || ""}
              onChange={handleChange}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              id="phone"
              name="phone"
              value={userData?.phone || ""}
              onChange={handleChange}
              required
            />

            <Input
              label="Age"
              type="number"
              id="age"
              name="age"
              value={userData?.age || ""}
              onChange={handleChange}
              required
            />

            <Select
              label="Gender"
              id="gender"
              name="gender"
              value={userData?.gender || ""}
              onChange={handleChange}
              required
              options={genderOptions}
            />

            <Select
              label="Blood Group"
              id="blood_group"
              name="blood_group"
              value={userData?.blood_group || ""}
              onChange={handleChange}
              required
              options={bloodGroupOptions}
            />
          </div>

          <TextArea
            label="Address"
            id="address"
            name="address"
            value={userData?.address || ""}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        <div className={styles.formSection}>
          <h2>Emergency Contact</h2>
          <div className={styles.formGrid}>
            <Input
              label="Emergency Contact Name"
              id="emergency_name"
              name="emergency_name"
              value={userData?.emergency_name}
              onChange={handleChange}
              required
            />

            <Input
              label="Relation"
              id="emergency_relation"
              name="emergency_relation"
              value={userData?.emergency_relation}
              onChange={handleChange}
              required
            />

            <Input
              label="Emergency Contact Phone"
              type="tel"
              id="emergency_phone"
              name="emergency_phone"
              value={userData?.emergency_phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <Button
            type="submit"
            disabled={loading}
            fullWidth
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
