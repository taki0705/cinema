'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Booking = () => {
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const response = await axios.get('http://localhost:4999/api/seats?room_id=1');
                setSeats(response.data); 
            } catch (error) {
                console.error('Error fetching seat data:', error);
            }
        };
        fetchSeats();
    }, []);

    const handleSeatClick = (seat) => {
            setSelectedSeats((prev) => 
                prev.includes(seat.seat_id) 
                    ? prev.filter(id => id !== seat.seat_id) 
                    : [...prev, seat.seat_id]
            );  
    };

    return (
        <div className="bg-gray-100 py-10 mt-40">
            <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex">
                <div className="flex-1 mb-6 pr-4">
                    <h2 className="text-3xl font-semibold text-gray-700">Tee Yod: Quỷ Ăn Tạng Phần 2</h2>
                    <p className="text-sm text-red-500">
                        Theo quy định của cục điện ảnh, phim này không dành cho khán giả dưới 18 tuổi.
                    </p>
                    <div className="mb-6 flex items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            <span>Ghế trống</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-green-700 rounded"></div>
                            <span>Ghế đang chọn</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-red-500 rounded"></div>
                            <span>Ghế đã bán</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 border-2 bg-yellow-400 rounded"></div>
                            <span>Ghế VIP</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-12 h-8 bg-pink-400 rounded"></div>
                            <span>Ghế đôi</span>
                        </div>
                    </div>

                    <div className="mb-6 ">
                        <div className="grid grid-cols-10 gap-2  ">
                            {seats.map(seat => (
                                <div
                                    key={seat.seat_id}
                                    onClick={() => handleSeatClick(seat)}
                                    className={`w-8 h-8 rounded flex items-center justify-center text-sm cursor-pointer
                                        ${seat.status === 'available' ? 'bg-gray-300' : ''} 
                                        ${seat.status === 'sold' ? 'bg-red-500 text-white cursor-not-allowed' : ''} 
                                        ${seat.seat_type ==='Thường' ? 'bg-gray-300' : ''} 
                                        ${seat.seat_type === 'VIP' ? 'border-2 border-gold bg-yellow-400' : ''} 
                                        ${seat.seat_type === 'Couple' ? 'bg-pink-400' : ''}
                                        ${selectedSeats.includes(seat.seat_id) ? 'bg-green-700 text-white' : ''} 
                                    `}
                                >
                                    {`${seat.seat_row}${seat.seat_number}`}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>Tổng tiền:</div>
                    <div className="space-y-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                            Tiếp tục
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-start mt-6 w-1/3">
                    <img src="img/cover-fb-betacinemas-145642-260824-38.png" alt="Tee Yod Poster" className="w-40 h-60 object-cover mb-4" />
                    <p><strong>Thể loại:</strong> Kinh dị</p>
                    <p><strong>Thời lượng:</strong> 111 phút</p>
                    <p><strong>Rạp chiếu:</strong> Beta Thái Nguyên</p>
                    <p><strong>Ngày chiếu:</strong> 16/10/2024</p>
                    <p><strong>Giờ chiếu:</strong> 13:00</p>
                    <p><strong>Phòng chiếu:</strong> P2</p>
                </div>
            </div>
        </div>
    );
};

export default Booking;
