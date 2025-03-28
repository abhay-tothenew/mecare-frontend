"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/app/utils/context/Authcontext";

interface JwtPayload {
  id: string;
  role: string;
  name?: string;
  email?: string;
  profile_picture?: string;
  exp?: number;
}

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const payload: JwtPayload = jwtDecode(token);

      const userData = {
        id: payload.id,
        role: payload.role,
        name: payload.name || "",
        email: payload.email || "",
        profile_picture: payload.profile_picture || "",
      };

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      login({
        id: payload.id,
        name: payload.name || "",
        email: payload.email || "",
        token: token,
      });

      // Redirect based on role
      router.push(payload.role === "patient" ? "/home" : "/home");
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/auth/login");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
