  'use client';
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import 'react-toastify/dist/ReactToastify.css';
  import { toast, ToastContainer } from 'react-toastify';

  const Profile = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setrepeatPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [activeTab, setActiveTab] = useState('account');
    const [alldetail, SetAlldetail] = useState([]);
  
    const [userProfile, setUserProfile] = useState({
      username: '',
      fullname: '',
      phone: '',
      email: '',
      gender: '',
      birthday: '',
      city: '',
    });
    const [loading, setLoading] = useState(true);
    const notifysucess = ()=>{
      toast.success('Cập nhập mật khẩu thành công',{
          position:"top-center",
          autoClose: 3000,
          className: "z-[9999] !important",
      },2000)}
      const notifyupdatesuccess = () => {
        toast.success('Cập nhập thành công!', {
          position: "top-center",
          autoClose: 2000,
          className: "z-[9999] !important",
        });
      };
  
    
    useEffect(() => {
     
      const storedUser = localStorage.getItem('userid');
      console.log(storedUser);
      const fetchallDetails = async () => {
        try {
          if (storedUser) {
            const response =await axios.get(`http://localhost:8080/booking/detail/${storedUser}`);
            console.log(response.data);
            SetAlldetail(response.data); 
          }
        } catch (error) {
          console.error('Error fetching schedule details:', error);
        } finally { 
          setLoading(false);
        }
      };
     fetchallDetails();
    }, []);
    
    useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('userid');
      const fetchUserProfile = async () => {
        try {
          if (!token) {
            window.location.href = '/login';
            // notifyinfo();
            // SetTimeOut (()=>{
              
            // },1000)
            console.log('No token found');
            return;
          }
          const response = await axios.get(`http://localhost:8080/user/${storedUser}`, {
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
          });
          console.log(response);
          const user = response;
          setUserProfile({
            
            username: user.data.username || '',
            fullname: user.data.fullname || '',
            phone: user.data.phone || '',
            email: user.data.email || '',
            gender: user.data.gender || '',
            birthday: user.data.birthday || '',
            city: user.data.city || '',
          });
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
          setLoading(false);
        }
      };

      fetchUserProfile();
    }, []);
    const handlePasswordChange = async (e) => {
      const email = localStorage.getItem('email');
      console.log(email);
      e.preventDefault();
      if (password !== repeatPassword) {
        setPasswordError('Mật khẩu xác nhận không khớp');
        return;
      }
      try {
       
        const response = await axios.post(
          `http://localhost:8080/forgotPassword/changePassword/${email}`,
          { oldPassword, password ,repeatPassword},
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     'Content-Type': 'application/json',
          //   },
          // }
        );
        console.log('Password updated successfully:', response.data);
        notifysucess();
        setOldPassword('');
        setPassword('');
        setrepeatPassword('');
        setPasswordError('');
      } catch (error) {
        console.log(oldPassword);
        console.error('Error updating password:', error.response ? error.response.data : error.message);
        setPasswordError('Mật khẩu cũ không chính xác')
      }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setUserProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('userid');
      e.preventDefault();
      try {
        if (!token) {
          console.log('No token found');
          return;
        }
        const response = await axios.put(
          `http://localhost:8080/user/update/${storedUser}`,
          userProfile
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //     'Content-Type': 'application/json',
          //   },
          // }
        );
        notifyupdatesuccess();
      } catch (error) {
        console.error('Error updating user profile:', error.response ? error.response.data : error.message);
        alert('Đã xảy ra lỗi khi cập nhật thông tin.');
      }
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className="min-h-screen flex bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 justify-center items-center mt-40">
       <ToastContainer/>
        <div className="max-w-4xl w-full p-8 bg-white shadow-lg rounded-xl border-2 border-gray-300 transition-transform transform hover:scale-105">
       
          <div className="flex justify-between mb-6">
            <div
              className={`cursor-pointer text-2xl font-semibold px-6 py-2 transition-all ${
                activeTab === 'account' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Thông tin tài khoản
            </div>
            <div
              className={`cursor-pointer text-2xl font-semibold px-6 py-2 transition-all ${
                activeTab === 'history' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Lịch sử đặt hàng
            </div>
            <div
              className={`cursor-pointer text-2xl font-semibold px-6 py-2 transition-all ${
                activeTab === 'change' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('change')}
            >
              Đổi mật khẩu
            </div>
          </div>

          {activeTab === 'account' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-700 mb-2">Tài Khoản</p>
                  <input
                    type="text"
                    name="username"
                    placeholder="Tài khoản"
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Họ Tên</p>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Nhập họ tên"
                    className="border-2 border-gray-400 p-2 text-black w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.fullname}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Số Điện Thoại</p>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Nhập số điện thoại"
                    className="border-2 border-gray-400 p-2 text-black w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Email</p>
                  <input
                    type="text"
                    name="email"
                    placeholder="Nhập email"
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.email}
                    readOnly
                  />
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Giới Tính</p>
                  <select
                    name="gender"
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.gender}
                    onChange={handleInputChange}  
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </select>
                </div>
                <div>
                  <p className="text-gray-700 mb-2">Ngày Sinh</p>
                  <input
                    type="date"
                    name="birthday"
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.birthday ? new Date(userProfile.birthday).toISOString().split('T')[0] : ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-span-2">
                  <p className="text-gray-700 mb-2">Địa Chỉ</p>
                  <input
                    type="text"
                    name="city"
                    placeholder="Nhập địa chỉ"
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userProfile.city}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  Cập Nhật Thông Tin
                </button>
              </div>
            </div>
          )}

          {activeTab === 'change' && (
            <div>
              <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                  <label htmlFor="password" className="text-gray-700">Mật khẩu cũ</label>
                  <input
                    type="password"
                    id="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="text-gray-700">Mật khẩu mới</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="repeatPassword" className="text-gray-700">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    id="repeatPassword"
                    value={repeatPassword}
                    onChange={(e) => setrepeatPassword(e.target.value)}
                    className="border-2 border-gray-400 text-black p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                  )}
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
                  >
                    Đổi Mật Khẩu
                  </button>
                </div>
              </form>
            </div>
          )}
            {activeTab === 'history' ? (
  <table className="min-w-full table-auto">
    <thead>
      <tr className="border-b">
        <th className="p-2 text-left"><strong>Mã</strong></th>
        <th className="p-2 text-left"><strong>Ghế ngồi</strong></th>  
        <th className="p-2 text-left"><strong>Phòng</strong></th> 
        <th className="p-2 text-left"><strong>Cinema</strong></th> 
        <th className="p-2 text-left"><strong>Ngày chiếu</strong></th>
        <th className="p-2 text-left"><strong>Giờ chiếu</strong></th>
        <th className="p-2 text-left"><strong>Tổng tiền</strong></th>
      </tr>
    </thead>
    <tbody>
              {alldetail.length > 0 ? (
                   alldetail?.map((data, index) => {
                               
                                return (
                                  <tr key={index} className="border-b">
                                    <td className="p-2">{data.bookingId}</td>
                                    <td className="p-2">{data.seatNames}</td>
                                    <td className="p-2">{data.roomName}</td>
                                    <td className="p-2">{data.cinemaName}</td>
                                    <td className="p-2">{data.scheduleDate}</td>
                                    <td className="p-2">{data.scheduleStart}</td>
                                    <td className="p-2">{new Intl.NumberFormat('vi-VN').format(data.totalPrice)} VND</td>

                                  </tr>
                                );
                              })
                            ) : (
                              <tr>
                                <td colSpan="7" className="p-2 text-center">Không có lịch sử đặt hàng.</td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      ) : null}


        </div>
      </div>
    );
  };

  export default Profile;
