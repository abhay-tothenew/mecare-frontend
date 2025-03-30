import Header from "./components/Header";
import "./globals.css";
import { AuthProvider } from "./utils/context/Authcontext";
import type { Metadata } from "next";

export const metadata: Metadata = {
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
