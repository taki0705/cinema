'use client'
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); 
  const [tokennew, setTokennew] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const notifysendsuccess = () => {
    toast.success('Gửi OTP thành công!', {
      position: "top-center",
      autoClose: 2000,
      className: "z-[9999] !important",
    });
  };
  const notifychangesuccess = () => {
    toast.success('Đổi mật khẩu thành công!', {
      position: "top-center",
      autoClose: 2000,
      className: "z-[9999] !important",
    });
  };
  const handleSendEmail = async () => {
    try {
     
      const response = await fetch('http://localhost:4000/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        const data = await response.json();
        setTokennew(data.token);
        notifysendsuccess();
        setStep(2); 
      } else {
        throw new Error('Không thể gửi email. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch(`http://localhost:4000/reset-password/${tokennew}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp,password }),
      });

      if (response.ok) {
        notifychangesuccess();
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
          <>
            <h2 className="text-xl font-bold mb-4 text-center">Nhập mã OTP</h2>
            <input
              type="text"
              placeholder="Nhập mã OTP"
              value={otp}  onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
              <input
              type="text"
              placeholder="Nhập mật khẩu cần đổi"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
              <input
              type="text"
              placeholder="Xác nhận mật khẩu"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
             Đổi mật khẩu
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
