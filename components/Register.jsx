import Link from 'next/link'
import React from 'react'

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 mt-40  bg-gray-200">
      <h1 className="text-2xl font-bold mb-4 text-black">Đăng Ký</h1>
      <form className="bg-white p-6 rounded shadow-md w-96  ">
        <div className="mb-4">
          <label htmlFor="hoten" className="block text-sm font-medium text-gray-700">
            Họ Tên
          </label>
          <input
            type="text"
            id="hoten"
            required
            className="mt-1 block w-full border  border-gray-300 text-black rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full border border-gray-300 text-black rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật Khẩu
          </label>
          <input
            type="password"
            id="password"
            Placeholder="Nhập mật khẩu"
            required
            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
            Nhập Lại Mật Khẩu
          </label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Nhập lại mật khẩu "
            required
            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Giới Tính
          </label>
          <select
            id="gender"
            required
            
            className="mt-1 block w-full border  text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="">Chọn giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Số Điện Thoại
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Số điện thoại"
            required
            className="mt-1 block w-full border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
        
          />
        </div>
        <div class="flex items-start p-2">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div class="ml-3 text-sm ">
                        <label for="terms" class="font-light text-black">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Đăng Ký
        </button>
      </form>
      <div className="mt-4">
        <Link href="/login" className="text-blue-600 hover:underline">
          Đăng Nhập
        </Link>
      </div>
      <div className="mt-2">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Quên Mật Khẩu?
        </Link>
      </div>
    </div>
  )
}

export default Register
