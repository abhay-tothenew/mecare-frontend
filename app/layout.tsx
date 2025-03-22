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
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = (user: any): never[] => {
    setUser(user);
    setIsAuthenticated(true);
    setUser(null);
    setIsLoading(false);
    return [];
  };

  const logout = (): never[] => {
    setUser(null);
    setIsAuthenticated(false);
    redirect('/');
    return [];
  };
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
