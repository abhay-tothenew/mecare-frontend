"use client";
import { useState } from "react";
import Header from "./components/Header";
import "./globals.css";
import AuthContext from "./utils/api/context/Authcontext";
import { redirect } from "next/navigation";

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
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </AuthContext.Provider>
  );
}
