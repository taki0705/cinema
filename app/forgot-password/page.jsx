'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu xác nhận không khớp');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user_id');
      if (!token) {
        console.log('No token found');
        return;
      }
      const response = await axios.post(
        `http://localhost:4000/user/${storedUser}/changepassword/`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Mật khẩu đã được cập nhật!');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordError('');
    } catch (error) {
      console.error('Error updating password:', error.response ? error.response.data : error.message);
      alert('Đã xảy ra lỗi khi cập nhật mật khẩu.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Thay đổi mật khẩu</h2>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700 font-semibold mb-2">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border rounded-md text-gray-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              required
            />
            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              Đổi Mật Khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
