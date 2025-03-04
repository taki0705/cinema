  'use client';
  import React, { useEffect, useState } from 'react';
  import axios from 'axios';
  import { useParams } from 'next/navigation';
  import 'react-toastify/dist/ReactToastify.css';
  import { toast,ToastContainer } from 'react-toastify'; 
  const Booking = () => {
   
    const [seats, setSeats] = useState([]);  
    const [seatsexisted, setSeatsexisted] = useState([]);  
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);  
    const { movieId, roomId, sc } = useParams();
    const [userid, SetUserId] = useState([]);
    const [schedule, setSchedule] = useState(null);  
    const [cinemaid, Setcinemaid] = useState(null);
    const [cinemaData, setCinemaData] = useState(null);
    const [seatmovie, Setseatmovie] = useState([]);
    const [showModal, setShowModal] = useState(false);  
    const [Booking,  SetBooKing ] = useState([]);  
    const notifywarning =()=>{
      toast.warning('Ghế này đã bán hãy chọn ghế khác',{
          position:"top-center",
          autoClose: 3000,
          className: "z-[9999] !important",
      },2000)
    }
    const handleConfirmBooking = () => {
      console.log('Đặt vé thành công với các ghế:', selectedSeats);
      setShowModal(false); // Đóng modal
    };
    const notifysucess =()=>{
      toast.success('Bạn đã đặt ghế thành công',{
          position:"top-center",
          autoClose: 3000,
          className: "z-[9999] !important",
      },200)
    }
    useEffect(() => {
      const fetchMovieDetails = async () => {
        setLoading(true);
        try {
          if (movieId) {
            const response = await fetch(`http://localhost:8080/movie/${movieId}`);
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
    
    useEffect(() => {
      console.log(seatsexisted.seat_ids); 
    }, [seatsexisted]);

    useEffect(() => {
      const userr = localStorage.getItem('userid');
      console.log(userr);
      if (userr) {
        const parsedUser = JSON.parse(userr);
        SetUserId(parsedUser);
      }
    }, []); 
    useEffect(() => {
      const fetchallseat = async () => {
        const cinemaiddd = localStorage.getItem('selectedCinema');
        console.log(cinemaiddd);
        try {
          console.log(cinemaiddd);
            const response =await axios.get(`http://localhost:8080/seats/bookingcinema/${cinemaiddd}`);
          if (!response.data || !response.data.bookings) {
            console.warn("No bookings found for the provided cinema ID");
            Setseatmovie([]); 
            return;
          } 
          // Trích xuất seat_ids nếu bookings tồn tại
          if (response.data.bookings) {
            const seatIds = response.data.bookings.flatMap(booking => booking.seat_ids);
            Setseatmovie(seatIds);
            console.log('API Response:', seatIds);
            console.log(seatmovie);
          }
        } catch (error) {
          console.error('Error fetching schedule details:', error);
        } 
      };

      fetchallseat();
    }, []);
    useEffect(() => {
      const cinemaiddd = localStorage.getItem('selectedCinema');
      Setcinemaid(cinemaiddd);
    }, []);

    useEffect(() => {
      const fetchScheduleDetails = async () => {
        try {
          if (sc) {
            const response =await axios.get(`http://localhost:8080/schedule/sc/${sc}`);
            console.log(response.data);
              setSchedule(response.data); 
            
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
      if (sc) {
        const fetchSeats = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/seat/${sc}`);
            console.log(response.data);
            setSeats(response.data); 
        
          } catch (error) {
            console.error('Error fetching seat data:', error);
          }
        };
        fetchSeats();
      }
    }, [sc]);

    
    useEffect(() => {
      if (sc) {
        const fetchSeats = async () => {
          try {
            const response = await axios.get(`http://localhost:8080/booking/schedule/${sc}`);
            setSeatsexisted(response.data);
            // console.log(seatsexisted.seat_id);
          } catch (error) {
            console.error('Error fetching seat data:', error);
          }
        };
        fetchSeats();
      } 
    },[sc]);
    useEffect(() => {
      if (cinemaid) {
        fetch(`http://localhost:8080/cinema/${cinemaid}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then((data) => setCinemaData(data))
          .catch((error) => console.error('Error fetching cinema data:', error));
          console.log(cinemaData);
      }
    }, [cinemaid]);
    

    const handleBooking = async () => {
      console.log("Selected Seats:", selectedSeats);
      try {
        const totalPrice = calculateTotalPrice();
        console.log("Calculated Total Price:", totalPrice);
    
        const payload = JSON.stringify({
          seatIds: selectedSeats,
          totalPrice: totalPrice
        });
        console.log("Payload to send:", payload);
    
        const response = await axios.post(
          `http://localhost:8080/booking/${userid}/${sc}`,
          payload,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
    
        console.log("Response:", response.data);
        SetBooKing(response.data.booking_id);  
      } catch (error) {
        console.error("Error booking the seats:", error);
        alert("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    };
    
        // const handleBooking2 = async () => {
        //   try {   
        //     const paymentResponse = await axios.get(`http://localhost:4000/payment/${Booking}`);
        //     const payUrll  = paymentResponse.data.payUrl;
        //     console.log('Payment URL:', payUrll);
        //     window.location.href = payUrll;
        //     notifysucess();
        //   } catch (error) {
        //     console.error('Booking failed:', error);
        //   }
        // };
        const handleBooking2 = async () => {
          try {
            notifysucess();
          } catch (error) {
            console.error('Booking failed:', error);
          }
        };
        const calculateTotalPrice = () => {
          const total = selectedSeats.reduce((total, seatId) => {
            const seat = seats.find((s) => s.seat_id === seatId);  
            if (seat && !isSeatSold(seat.seat_id)) {
              return total + (seat?.seat_price || 0);
            } 
            
          }, 0);
          return total;
        }

    const handleSeatClick = (seat) => {
      if (isSeatSold(seat.seat_id)) {
        notifywarning();
        return; 
      }
    
      setSelectedSeats((prev) =>
        prev.includes(seat.seat_id)
          ? prev.filter((id) => id !== seat.seat_id) 
          : [...prev, seat.seat_id] 
      );
    };
    const isSeatSold = (seatId) => {
      return seatmovie.includes(seatId);
    };
    if (loading) return <div>Loading...</div>;

    return (
      <div className="bg-gray-100 py-10 mt-40">
        <ToastContainer/>
        <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg flex">
          <div className="flex-1 mb-6 pr-4">
            <h2 className="text-3xl font-semibold text-gray-700">Đặt vé</h2>
            <div className="mb-6 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
                <span>Vị trí phù hợp</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-700 rounded"></div>
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
                <span>Ghế đôi</span>
              </div>
            </div>

            <div className="text-2xl font-semibold text-gray-800 flex justify-center items-center border-2 border-gray rounded-lg shadow-lg h-20 m-10">Màn hình chính</div>

            <div className="mb-6">
              <div className="grid grid-cols-10 gap-2">
                {Array.isArray(seats) && seats.map((seat) => (
                  <div
                    key={seat.seat_id}
                    onClick={() => handleSeatClick(seat)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm cursor-pointer
                        ${isSeatSold(seat.seat_id) ? 'bg-red-600 text-white cursor-not-allowed' : ''}
                      ${seat.seat_type  === 'Thường' ? 'bg-gray-300' : ''}
                      ${seat.seat_type === 'VIP' ? 'border-2 border-gold bg-yellow-300' : ''}
                      ${seat.seat_type === 'Couple' ? 'bg-pink-300' : ''}
                      ${!isSeatSold(seat.seat_id) && selectedSeats.includes(seat.seat_id) ? 'bg-blue-900 text-white' : ''}
                    
                    `}
                  >
                    {`${seat.seat_row}${seat.seat_number}`}
                  </div>
                ))}
              </div>
            </div>

            <div>Tổng tiền: {calculateTotalPrice()} đ</div>
            <div className="space-y-4">
            <button
    disabled={selectedSeats.length === 0}
    onClick={() => {
      setShowModal(true);
      handleBooking();
    }}
    className={`px-4 py-2 rounded-md ${selectedSeats.length > 0 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
  >
    Continue
  </button>

            {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
              <h2 className="text-xl font-semibold mb-4">Xác nhận đặt vé</h2>
              <p className="mb-4">Bạn có chắc chắn muốn đặt các ghế đã chọn?</p>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Hủy
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleBooking2}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        )}
            </div>
          </div>

          <div className="flex flex-col items-start mt-6 w-1/3">
        
            <img
              src={movie?.movie_poster || 'ngu' }
              alt={movie?.movie_name}
              className="w-80 h-90 object-cover mb-4 rounded rounded-md"
            />
            <div><strong>Rạp chiếu:</strong> {cinemaData?.cinema_name}</div>
            <div><strong>Ngày chiếu:</strong> {new Date(schedule?.schedule_date).toLocaleDateString('vi-VN')}</div>
            <div><strong>Giờ chiếu:</strong> {schedule?.schedule_start}</div>
            <div><strong>Phòng chiếu:</strong> {schedule?.room_id}</div>
            {/* <div><strong>Ghế ngồi:</strong> {selectedSeats.join(', ')}</div> */}
          </div>
        </div>
      </div>
    );
  };

  export default Booking;
