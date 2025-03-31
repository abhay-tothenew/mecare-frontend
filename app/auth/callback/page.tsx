"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/app/utils/context/Authcontext";
import { Suspense } from "react";

interface JwtPayload {
  id: string;
  role: string;
  name?: string;
  email?: string;
  profile_picture?: string;
  exp?: number;
}

function AuthCallbackContent() {
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

      // Only access localStorage on the client side
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      login({
        id: payload.id,
        name: payload.name || "",
        email: payload.email || "",
        token: token,
      });

      router.refresh();
      // Redirect based on role
      router.push(payload.role ? "https://mecare-frontend.vercel.app/home" : "https://mecare-frontend.vercel.app/home");
    } catch (error) {
      console.error("Error decoding token:", error);
      router.push("/auth/login");
    }
  }, [searchParams, router, login]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
