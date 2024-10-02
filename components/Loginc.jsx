'use client'; // This should be present to indicate it's a Client Component
import Link from 'next/link';

export const Loginc = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-2xl text-black font-bold mb-4">Đăng Nhập</h1>
      <form className="bg-white p-6 rounded shadow-md w-80">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Mật Khẩu
          </label>
          <input
            type="password"
            id="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Đăng Nhập
        </button>
      </form>
      <div className="mt-4">
        <Link href="/register" className="text-blue-600 hover:underline">
          Đăng Ký
        </Link>
      </div>
      <div className="mt-2">
        <Link href="/forgot-password" className="text-blue-600 hover:underline">
          Quên Mật Khẩu?
        </Link>
      </div>
    </div>
  );
};

