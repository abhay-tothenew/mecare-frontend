"use client";
import { useState } from "react";
import Header from "./components/Header";
import "./globals.css";
import { redirect } from "next/navigation";
import { AuthProvider } from "./utils/context/Authcontext";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "MedCare",
  description: "Book appointments with ease",
  keywords: "healthcare, medical, appointments, booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
