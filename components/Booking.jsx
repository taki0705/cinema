'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const Booking = () => {
  const [seats, setSeats] = useState([]);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { movieId, roomId,sc } = useParams();
  const [user,SetUserId]=useState([]);
  const [schedule, setSchedule] = useState(null);
  const [cinemaid, Setcinemaid] = useState(null);
  useEffect(()=>{
    const userr=localStorage.getItem('user');
    console.log(userr);
    SetUserId(userr);
  })
  useEffect(() => {
    const cinemaiddd = localStorage.getItem('selectedCinema');
    console.log(cinemaiddd);
    Setcinemaid(cinemaiddd);
  }, []); 
  useEffect(() => {
    const fetchScheduleDetails = async () => {
      try {
        if (sc) {
          const response = await axios.get(`http://localhost:4000/schedules/sc/${sc}`);
          console.log('Response:', response.data); 
          if (response.data.rooms.length > 0) {
            setSchedule(response.data.rooms[0]); // Set only the first room's schedule
          }
        }
      } catch (error) {
        console.error('Error fetching schedule details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (sc) fetchScheduleDetails();
  }, [sc]);
  
  useEffect(() => {
    if (roomId) {
      const fetchSeats = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/seats/${roomId}`);
          setSeats(response.data.seats);
        } catch (error) { 
          console.error('Error fetching seat data:', error);
        }
      };
      fetchSeats();
    }
  }, [roomId]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        if (movieId) {
          const response = await fetch(`http://localhost:4000/movies/${movieId}`);
          if (!response.ok) throw new Error('Failed to fetch movie details');
          const data = await response.json();
          setMovie(data);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) fetchMovieDetails();
  }, [movieId]);
  const handleBooking = async () => {
    if (!user || !user.user_id) {
      alert("Vui lòng đăng nhập.");
      return;
    }
  
    try {
      const response = await axios.post(
        `http://localhost:4000/booking/${user.user_id}/${sc}`,
        {
          seat_ids: selectedSeats,
          total_price: calculateTotalPrice(),
        }
      );
      console.log("Booking Successful:", response.data);
      alert("Booking successful!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Đặt vé thất bại. Vui lòng thử lại.");
    }
  };
  
  
  const calculateTotalPrice = () => {
    const total = selectedSeats.reduce((total, seatId) => {
      const seat = seats.find((s) => s.seat_id === seatId);
      return total + (seat?.seat_price || 0);
    }, 0);
    
    return total.toLocaleString('vi-VN'); // Format the total after summation
  };
  
  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat.seat_id)
        ? prev.filter((id) => id !== seat.seat_id)
        : [...prev, seat.seat_id]
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 py-10 mt-40">
     
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex">
        <div className="flex-1 mb-6 pr-4">
          <h2 className="text-3xl font-semibold text-gray-700">Đặt vé</h2>

          {/* Seat selection section */}
          <div className="mb-6 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <span>Vị trí phù hợp</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-700 rounded"></div>
              <span>Ghế lựa chọn</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <span>Ghế đã bán</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 border-2 bg-yellow-500 border-gold rounded"></div>
              <span>Ghế VIP</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-12 h-8 bg-pink-400 rounded"></div>
              <span>Ghế đôi </span>
            </div>
          </div>

              <div className="text-2xl font-semibold text-gray-800 flex justify-center items-center border-2 border-gray rounded-lg shadow-lg  h-20 m-10 ">Màn hình chính</div> 
         
          {/* Seat grid */}
          <div className="mb-6">
            <div className="grid grid-cols-10 gap-2">
              {Array.isArray(seats) && seats.map((seat) => (
                <div
                  key={seat.seat_id}
                  onClick={() => handleSeatClick(seat)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm cursor-pointer
                    ${seat.status === 'available' ? 'bg-gray-300' : ''} 
                    ${seat.status === 'sold' ? 'bg-red-500 text-white cursor-not-allowed' : ''} 
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

          <div>Tổng tiền: {calculateTotalPrice()} đ</div>
          <div className="space-y-4">
                      <button onClick={handleBooking} disabled={selectedSeats.length === 0}
              className={`px-4 py-2 rounded-md ${selectedSeats.length > 0? "bg-blue-500 text-white hover:bg-blue-600": "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>

          </div>
        </div>

        {/* Movie details */}
        <div className="flex flex-col items-start mt-6 w-1/3">
          <img
            src={movie?.movie_poster}
            alt={movie?.movie_name}
            className="w-80 h-90 object-cover mb-4 rounded rounded-md"
          />

        <div><strong>Rạp chiếu:</strong> {cinemaid}</div>
          <div><strong>Ngày chiếu:</strong> {new Date(schedule?.schedule_date).toLocaleDateString('vi-VN')}</div>
          <div><strong>Giờ chiếu:</strong> {schedule?.schedule_start}</div>
          <div><strong>Phòng chiếu: </strong>{schedule?.room_id}</div>
          <div><strong>Ghế ngồi: </strong>{selectedSeats.join(', ')}</div>

        </div>
      </div>
    </div>
  );
};

export default Booking;
