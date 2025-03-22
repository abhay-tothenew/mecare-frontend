"use client";
import { useState } from "react";
import Header from "./components/Header";
import "./globals.css";
import { redirect } from "next/navigation";
import { AuthProvider } from "./utils/context/Authcontext";

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
