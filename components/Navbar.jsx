'use client';
import Link from 'next/link';
import React from 'react';

export const Navbar = () => {
  return (
    <div>
      <div className="w-full p-2 bg-black">
        <div className="flex items-center justify-end space-x-4 mr-20">
          <Link href="/login" className="text-white">Đăng nhập</Link>
          <Link href="/register" className="text-white">Đăng ký</Link>
        </div>
      </div>

      <nav className="flex items-center p-5 ml-20">
        <div>
          <img src="\img\images.png" alt="Logo" className="h-20" />
        </div>
        <div className="ml-40 w-50">
          <select
            id="province"
            name="province"
            className="block w-full px-3 text-sm text-gray-900 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="1">Hà Nội</option>
            <option value="2">Hồ Chí Minh</option>
            <option value="3">Bắc Giang</option>
          </select>
        </div>
        <div className="p-4 rounded-md ml-60">
        <ul className="flex space-x-10">
          {[
            { name: 'Lịch Chiếu', path: 'showtimes' },
            { name: 'Phim', path: 'movies' },
            { name: 'Rạp', path: 'cinemas' },
            { name: 'Bảng Tin', path: 'news' },
            { name: 'Thành Viên', path: 'members' },
          ].map((item) => (
            <li key={item.name} className="p-2 hover:bg-gray-200 cursor-pointer transition duration-300 ease-in-out">
              <Link href={`/${item.path}`} passHref>
                <span className="text-black uppercase font-bold">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </nav>
    </div>
  );
};
