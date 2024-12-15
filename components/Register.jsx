'use client';
import Link from 'next/link'
import React, { useState } from 'react'
import axios from 'axios'

import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {
  const [username, setuserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [isAgree, setIsAgree] = useState(false)

  const notifysuccess = () => {
    toast.success('Đăng Ký thành công!', {
      position: "top-center",
      autoClose: 3000,
      className: "z-[9999] !important",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      console.error('Mật khẩu và xác nhận mật khẩu không khớp!')
      return
    }
    console.log( email,
      username,
      password,
      phone
  )
    try {
      const response = await axios.post('http://localhost:4000/register', {
        email,
        username,
        password,
        phone,
      })
      notifysuccess();
      setTimeout(() => {  
        window.location.href = '/login';
      }, 3000);
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng ký!', error)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-r from-blue-200 to-teal-200 min-h-screen mt-20">
      <ToastContainer/>
      <h1 className="text-3xl font-bold mb-6 text-black">Đăng Ký</h1>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="hoten" className="block text-sm font-medium text-gray-700">User Name </label>
          <input
            type="text"
            id="hoten"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Nhập Lại Mật Khẩu</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Số Điện Thoại</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Số điện thoại"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 mb-6">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            checked={isAgree}
            onChange={(e) => setIsAgree(e.target.checked)}
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            Tôi đồng ý với{' '}
            <a href="#" className="font-medium text-blue-600 hover:underline">Điều khoản và Điều kiện</a>
          </label>
        </div>
        <button
          type="submit"
          disabled={!isAgree}
          className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Đăng Ký
        </button>
      </form>
      <div className="mt-6 text-sm">
        <Link href="/login" className="text-blue-600 hover:underline">
          Đã có tài khoản? Đăng nhập
        </Link>
      </div>
      <div className="mt-2 text-sm">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Quên mật khẩu?
        </Link>
      </div>
    </div>
  )
}

export default Register
