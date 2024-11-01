  'use client';
  import { useState } from 'react';
  import { useRouter } from 'next/navigation'; 
  import Link from 'next/link';

  export const Loginc = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter(); 

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');

      try {
        const response = await fetch('http://localhost:8081/api/v1/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
          throw new Error('Login failed. Please check your credentials.');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Login successful:', data);
        router.push('/'); 
        
      } catch (error) { 
        setError(error.message);
      }
    };

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 mt-20">
        <h1 className="text-2xl text-black font-bold mb-4">Đăng Nhập</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-300 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-300 focus:outline-none focus:ring focus:ring-blue-500 mt-5"
          >
            Đăng Nhập bằng FaceBook
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
