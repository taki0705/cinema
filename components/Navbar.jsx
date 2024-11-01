'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }
        const response = await axios.get('http://localhost:8081/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserName(response.data.email);
        console.log("Profile fetched successfully");
      } catch (error) {
        console.log('Error fetching user profile:', error.response ? error.response.data : error.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserName('');
    setIsDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Đảo trạng thái của dropdown
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[99998] bg-black text-white">
      <div className="flex justify-end p-4">
        <div className="relative">
          {userName ? (
            <>
              <div className="text-white cursor-pointer" onClick={toggleDropdown}>
                Xin chào, {userName} <span className="text-sm">▼</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute bg-white text-black right-0 mt-2 w-48 rounded-md shadow-lg">
                  <Link href="/profile">
                    <div className="p-2 hover:bg-gray-100">Hồ sơ cá nhân</div>
                  </Link>
                  <Link href="/order-history">
                    <div className="p-2 hover:bg-gray-100">Lịch sử đặt hàng</div>
                  </Link>
                  <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                    Đăng xuất
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className=" space-x-4 ">
              <Link href="/login" className="text-white ml-200 ">Đăng nhập</Link>
              <Link href="/register" className="text-white">Đăng ký</Link>
            </div>
          )}
        </div>
      </div>
      <nav className="flex items-center p-4 bg-white">
        <div className="relative">
          <Link href="/">
            <img src="/img/images.png" alt="Logo" className="h-20" />
          </Link>
        </div>
        <div className="ml-10 w-52">
          <select
            id="province"
            name="province"
            className="ring ring-black ring-offset-2 block w-full h-10 px-3 rounded-lg border-2 text-sm text-gray-900 bg-gray-200 focus:outline-none"
          >
            <option value="1">Alpha Hà Nội</option>
            <option value="2">Alpha Hồ Chí Minh</option>
            <option value="3">Alpha Bắc Giang</option>
            <option value="4">Alpha Bắc Ninh</option>
          </select>
        </div>
        <div className="ml-auto">
          <ul className="flex space-x-10">
            {[
              { name: 'Phim', path: 'movies' },
              { name: 'Lịch chiếu', path: 'showtimes' },
              { name: 'Rạp', path: 'cinemas' },
              { name: 'Bảng Tin', path: 'news' },
              { name: 'Thành Viên', path: 'members' },
            ].map((item) => (
              <li key={item.name} className="p-2 cursor-pointer transition duration-300 ease-in-out">
                <Link href={`/${item.path}`} passHref>
                  <span className="text-black uppercase font-bold hover:text-blue-600">
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
