'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useSearchParams } from 'next/navigation';

export const Loginc = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const notifyload = () => {
    toast.loading('Đang Đăng nhập!', {
      position: "top-center",
      autoClose: 3000,
      className: "z-[9999] !important",
    });
  };
  const notifysuccess = () => {
    toast.success(' Đăng nhập thành công!', {
      position: "top-center",
      autoClose: 3000,
      className: "z-[9999] !important",
    });
  };

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
        throw new Error('Thông tin tài khoản mật khẩu không chính xác.');
      }
      const data = await response.json();
      console.log(data);
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username',data.user.username);
        localStorage.setItem('userid', JSON.stringify(data. user.user_id));
      
         notifyload(); 
         
        setTimeout(() => {
          notifysuccess();
        }, 2000);
        setTimeout(() => {
          window.location.reload();  
          window.location.href = '/';
        }, 4000);
        
        
      } else {
        throw new Error('Invalid response format.');
      }
    } catch (error) {
      setError(error.message);
    }
  };    

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http://localhost:4000/google/callback&scope=profile%20email&client_id=72683119711-qeeeo0btckiv0ohisle4e1nb3kgslgj2.apps.googleusercontent.com`;
  };
  const searchParams = useSearchParams();
  useEffect(() => {
      const fetchgoogle = async ()=>{
        const searchToken = searchParams.get('token');
          if (searchToken) {
    
      console.log(searchToken);
      const response = await axios.get('http://localhost:4000/login/success', {
        withCredentials: true, 
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${searchToken}`,
            },       
    });
  
      localStorage.setItem('token',searchToken );
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('userid', response.data.user.user_id);
       notifyload(); 
      setTimeout(() => {
        notifysuccess();
      }, 2000);
      setTimeout(() => {
        window.location.reload();  
        window.location.href = '/';
      }, 4000);
    }
 } 


 fetchgoogle();
}, []);
  
    

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
        <ToastContainer />
        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-600 hover:underline">Đăng Ký</Link>
        </div>
  
        <div className="mt-2 text-center">
          <Link href="/otp" className="text-blue-600 hover:underline">Quên Mật Khẩu?</Link>
        </div>
      </div>
    </div>
  );
};
