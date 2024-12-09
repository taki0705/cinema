'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [cinemas, setCinemas] = useState([]);
  const [userName, setUserName] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(''); // state for selected cinema

  const notiftlogout = () => {
    toast.info("Bạn đã đăng xuất ",{
      position:"top-right",
      className:"z-[9999]",
      autoClose:3000
    })
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    console.log(username);
    if (token) {
      const fetchUserProfile = async () => {
        try {
          setUserName(username);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/cinemas")
      .then((response) => {
        setCinemas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cinemas:", error);
      });
    const savedCinema = localStorage.getItem('selectedCinema');
    if (savedCinema) {
      setSelectedCinema(savedCinema); // Set the saved cinema ID to the state
    }
  }, []);

  const handleCinemaChange = (e) => {
    const cinemaId = e.target.value;
    console.log('Selected Cinema ID:', cinemaId);
    localStorage.setItem('selectedCinema', cinemaId);
    setSelectedCinema(cinemaId); 
    window.location.reload();
  };

  const handleLogout = () => {  
    localStorage.removeItem('token');
    notiftlogout();
    setUserName('');
    setIsDropdownOpen(false); 
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); 
  };

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-[#181518] text-white py-1">
      <ToastContainer />
      <div className="flex justify-end p-4 border-b border-gray-700">
        <div className="relative">
          {userName ? (
            <>
              <div
                className="text-white cursor-pointer hover:text-blue-400 transition duration-300"
                onClick={toggleDropdown}
              >
                Xin chào, {userName} <span className="text-sm">▼</span>
              </div>
              {isDropdownOpen && (
                <div className="absolute bg-[#232323] text-white right-0 mt-2 w-48 rounded-md shadow-lg">
                  <Link href="/profile">
                    <div className="p-2 hover:bg-gray-300 cursor-pointer transition">Hồ sơ cá nhân</div>
                  </Link>
                  <Link href="/order-history">
                    <div className="p-2 hover:bg-gray-300 cursor-pointer transition">Lịch sử đặt hàng</div>
                  </Link>
                  <div
                    className="p-2 hover:bg-gray-300 cursor-pointer transition"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex space-x-4">
              <Link href="/login" className="text-white hover:text-blue-400">
                Đăng nhập
              </Link>
              <Link href="/register" className="text-white hover:text-blue-400">
                Đăng ký
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navbar */}
      <nav className="flex items-center px-4 bg-[#181518]">
        <div className="relative">
          <Link href="/">
            <img src="/img/AlphaFilm.webp" alt="Logo" width={100} height={100} />
          </Link>
        </div>
        <div className="ml-10 w-52">
          <select
            id="province"
            name="province"
            className="block w-full h-10 px-3 rounded-lg border-2 border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleCinemaChange}
            value={selectedCinema} // Set the value to the state to keep the selected option persistent
          >
            {cinemas?.map((cinema) => (
              <option key={cinema.cinema_id} value={cinema.cinema_id}>
                {cinema.cinema_name}
              </option>
            ))}
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
              <li
                key={item.name}
                className="p-2 cursor-pointer transition duration-300 ease-in-out"
              >
                <Link href={`/${item.path}`} passHref>
                  <span className="text-white uppercase font-bold hover:text-blue-400">
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
