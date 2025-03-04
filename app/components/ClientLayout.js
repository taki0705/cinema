"use client";

import { usePathname } from "next/navigation";
import Footer from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import Side from "@/app/admin/Side"; 


export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = ["/admin", "/dashboard", "/settings"].some((path) =>
    pathname.startsWith(path)
  );

  return (
    <div className="flex">
      {isAdminRoute && <Side />} {/* Hiển thị Sidebar nếu là trang admin */}
      <div className="flex-1">
        {!isAdminRoute && <Navbar />}
        <main>{children}</main>
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );  
}
