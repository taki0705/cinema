'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account'); 
  const [userProfile, setUserProfile] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log("No token found");
          return;
        }
        const response = await axios.get('http://localhost:8081/api/v1/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setUserProfile(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
        setLoading(false); 
      }
    };

    fetchUserProfile();
  }, []);

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-200 justify-center items-center mt-40   ">
      <div className="max-w-4xl w-full p-20 bg-white shadow-lg rounded-md">
        <div className="flex justify-between mb-6">
          <div
            className={`cursor-pointer text-2xl font-semibold ${activeTab === 'account' ? 'text-blue-500' : 'text-gray-700'}`}
            onClick={() => setActiveTab('account')}
          >
            Thông tin tài khoản
          </div>
          <div
            className={`cursor-pointer text-2xl font-semibold ${activeTab === 'history' ? 'text-blue-500' : 'text-gray-700'}`}
            onClick={() => setActiveTab('history')}
          >
            Lịch sử đặt hàng
          </div>
        </div>

        {activeTab === 'account' && userProfile && ( // Check if userProfile is available
          <div>
            <div className="grid grid-cols-2 grid-rows-5 gap-4">
              <div className="col-span-1">
                <p className="text-gray-700 mb-2">Tài Khoản</p>
                <input
                  type="text"
                  placeholder="Tài khoản"
                  className="border-2 border-gray-400 text-black p-2 w-full rounded-md"
                  value={userProfile.username || ''} 
                   
                />
              </div>

              <div className="col-span-1">
                <p className="text-gray-700 mb-2">Họ Tên</p>
                <input
                  type="text"
                  placeholder="Nhập họ tên"
                  className="border-2 border-gray-400 p-2 text-black w-full rounded-md"
                  value={userProfile.fullName || ''} 
                 
                />
              </div>

              <div className="col-span-1">
                <p className="text-gray-700 mb-2">Số Điện Thoại</p>
                <input
                  type="text"
                  placeholder="Nhập số điện thoại"
                  className="border-2 border-gray-400 p-2 text-black w-full rounded-md"
                  value={userProfile.phone || ''}
                 
                />
              </div>

              <div className="col-span-1">
                <p className="text-gray-700 mb-2">Email</p>
                <input
                  type="text"
                  placeholder="Nhập email"
                  className="border-2 border-gray-400 text-black p-2 w-full rounded-md"
                  value={userProfile.email || ''} 
                  readOnly
                />
              </div>

              <div className="col-span-1">
                <p className="text-gray-700 mb-2">Giới Tính</p>
                <input
                  type="text"
                  placeholder="Nhập giới tính"
                  className="border-2 border-gray-400 text-black p-2 w-full rounded-md"
                  value={userProfile.gender || ''}
              
                />
              </div>

              <div className="col-span-1">
                <p className="text-gray-700 mb-2">Ngày Sinh</p>
                <input
                  type="text"
                  placeholder="Nhập ngày sinh"
                  className="border-2 border-gray-400 text-black p-2 w-full rounded-md"
                  value={userProfile.dob || ''} 
                />
              </div>

              <div className="col-span-2">
                <p className="text-gray-700 mb-2">Địa Chỉ</p>
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  className="border-2 border-gray-400 text-black p-2 w-full rounded-md"
                  value={userProfile.address || ''}
                />
              </div>
              
              <div className="col-span-2 flex justify-between">
                <a href="" className="underline text-blue-500">Quên mật khẩu?</a>
              </div>
              
              <div className="col-span-2 flex justify-center">
                <button className="bg-slate-500 p-2 hover:bg-blue-500 text-white rounded-md px-20">Cập nhật</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <p>Đây là nội dung cho lịch sử đặt hàng.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
