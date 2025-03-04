"use client";
import Side from "@/app/admin/Side"; 
import ClientLayout from "./components/ClientLayout";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <ClientLayout>{children}</ClientLayout>   
      </body>
    </html>
  );
}

