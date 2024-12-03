import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-r from-blue-200 to-teal-200 min-h-screen p-20">
      <h1 className="text-3xl font-bold mb-6 text-black">Đăng Ký</h1>
      <form className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="hoten" className="block text-sm font-medium text-gray-700">
            Họ Tên
          </label>
          <input
            type="text"
            id="hoten"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật Khẩu
          </label>
          <input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Nhập Lại Mật Khẩu
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Nhập lại mật khẩu"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Giới Tính
          </label>
          <select
            id="gender"
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Số Điện Thoại
          </label>
          <input
            type="tel"
            id="phone"
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
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-2 focus:ring-blue-500"
            required
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            Tôi đồng ý với{' '}
            <a href="#" className="font-medium text-blue-600 hover:underline">
              Điều khoản và Điều kiện
            </a>
          </label>
        </div>
        <button
          type="submit"
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
