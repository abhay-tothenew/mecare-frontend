// "use client";

import { createContext, useContext, useState, useEffect } from "react";

// import {useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  user_id: string;
}

interface AuthContext {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        id: token,
        name: "John Doe",
        email: "john.doe@example.com",
        token: token,
        user_id: "384c86d0-8b8a-4e6e-ad98-fb6c158d1cb4",
      });
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("token", userData.token);
    setUser(userData);
    // router.refresh();
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    // router.refresh();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
