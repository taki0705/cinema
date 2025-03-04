"use client";
import Link from "next/link";
import { useState } from "react";

const Side = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className=" relative flex h-screen bg-gray-100 ">
      <div className={`h-full bg-white shadow-lg p-4  transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="text-gray-600 mb-4"
        >
          ☰
        </button>
        <ul className="space-y-4">
          <li className="flex items-center ">
          
            {!collapsed && 
          <Link href="">
            <div className="p-2 hover:bg-gray-300 w-full cursor-pointer transition" > 🎬 Quản lý phim
           </div>
           </Link>
            }
          </li>
          <li className="flex items-center space-x-2">
            {!collapsed &&   <div className="p-2 w-full hover:bg-gray-300 cursor-pointer transition"> 👤 Người dùng
              </div>}
          </li>
          <li className="flex items-center space-x-2">
            {!collapsed &&   <div className="p-2 w-full hover:bg-gray-300 cursor-pointer transition"> ⚙️ Quản lý phim
              </div>}
          </li>
        </ul>
      </div>

    
    </div>
  );
};

export default Side;
