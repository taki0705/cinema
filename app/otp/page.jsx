'use client'
import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Bước: 1 - Nhập email, 2 - Nhập OTP

  const handleSendEmail = async () => {
    try {
      // Gửi email qua API
      const response = await fetch('http://localhost:4000/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('OTP đã được gửi đến email của bạn.');
        setStep(2); // Chuyển sang bước nhập OTP
      } else {
        throw new Error('Không thể gửi email. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      // Gửi OTP để xác nhận qua API
      const response = await fetch('http://loco4000/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        alert('OTP xác nhận thành công.');
        window.location.href = '/forget-password'; // Chuyển hướng đến forget-password
      } else {
        throw new Error('OTP không chính xác.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {step === 1 ? (
          // Giao diện bước 1: Nhập email
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Quên mật khẩu</h2>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleSendEmail}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Gửi OTP
            </button>
          </>
        ) : (
          // Giao diện bước 2: Nhập OTP
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Nhập mã OTP</h2>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Xác nhận OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
