import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


export const Loginc = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/login', {
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

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
     window.location.reload();
        setTimeout(() => {
          window.location.href = '/'; 
        }, 100);
      } else {
        throw new Error('Invalid response format.');
      }
    } catch (error) {
      setError(error.message);
    }
  };    

  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential; // Google token
  
      // Gửi token từ Google tới backend để xác thực và tạo token cho người dùng
      const res = await axios.post('http://localhost:4000/google', 
        { token: googleToken },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
  
      const data = res.data; // Lấy dữ liệu trả về từ server
  
      if (data.token && data.user) {
        // Lưu token và thông tin người dùng vào localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
  
        // Chuyển hướng tới trang chủ sau khi đăng nhập thành công
        router.push('/');
      } else {
        throw new Error('Google login failed.');
      }
    } catch (error) {
      setError(error.message); // Hiển thị lỗi nếu có
    }
  };
  
  
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 mt-20">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-center font-semibold text-gray-900 mb-6">Đăng Nhập</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật Khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white font-semibold py-2 rounded-md transition-all hover:from-orange-500 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Đăng Nhập
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Đăng Nhập bằng Google
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-600 hover:underline">Đăng Ký</Link>
        </div>

        <div className="mt-2 text-center">
          <Link href="/forgot-password" className="text-blue-600 hover:underline">Quên Mật Khẩu?</Link>
        </div>
      </div>
    </div>
  );
};
