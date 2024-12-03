'use client';  // Đảm bảo mã này chạy phía client

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const GoogleAuthCallback = () => {
  const router = useRouter(); // Sử dụng hook useRouter trong function component

  useEffect(() => {
    const handleGoogleCallback = async () => {
      if (!router.isReady) return;  // Đảm bảo router đã sẵn sàng

      const { token, user } = router.query;

      if (token && user) {
        try {
          const decodedUser = JSON.parse(decodeURIComponent(user));

          localStorage.setItem('token', token);  
          localStorage.setItem('user', JSON.stringify(decodedUser));

          router.push('/'); // Điều hướng sau khi hoàn thành
        } catch (error) {
          console.error('Error parsing user data:', error);
          router.push('/error');
        }
      } else {
        console.error('Google authentication failed. Missing token or user data.');
        router.push('/login');
      }
    };

    handleGoogleCallback(); // Gọi hàm callback khi component render

  }, [router]);  // Mảng phụ thuộc giúp tránh gọi liên tục

  return null; // Không cần render gì cả
};
