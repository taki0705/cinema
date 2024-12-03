'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const modalRef = useRef(); 

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/movies`);
        setMovies(response.data.movie);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const fetchSchedules = async (movieId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/schedules/${movieId}`);
      console.log('Schedules data:', response.data);  
      if (response.data && Array.isArray(response.data.rooms)) {
        setSchedules(response.data.rooms);  
      } else {
        console.error('Rooms data is not an array or does not exist');
      }
      
      setSelectedMovie(movieId);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="mt-44 px-4">
      <h1 className="text-center text-2xl font-bold text-gray-700 mb-8">Movies</h1>
      <div className="grid grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition duration-300 hover:scale-105"
          >
            <img
              src={movie.movie_poster}
              alt={movie.movie_description}
              className="w-full h-auto rounded-lg mb-4 max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-600">{movie.movie_name}</h2>
              <button
                onClick={() => fetchSchedules(movie.movie_id)}
                className="w-full mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Show Schedules
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div ref={modalRef} className="bg-white rounded-lg shadow-md p-8 max-w-xl w-full">
            <h2 className="text-center text-2xl font-bold text-gray-700 mb-6">Lịch chiếu 3 ngày gần nhất</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.isArray(schedules) && schedules.length > 0 ? (
                  schedules.map((schedule) => (
                    <div key={schedule.schedule_id} className="bg-white rounded-lg shadow-md p-5">
                      <h3 className="text-lg font-bold text-gray-700 ">
                    {new Date(schedule.schedule_date).toLocaleDateString('vi-VN', { weekday: 'long' })} {/* Thứ */}
                  </h3>
                  <h3 className="text-lg font-bold text-gray-700">
                    {new Date(schedule.schedule_date).toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' })} {/* Ngày tháng */}
                  </h3>


                      <p className="text-lg font-bold text-gray-700">Giờ : {schedule.schedule_start}</p>
                      <p className="text-lg font-bold text-gray-700">Phòng: {schedule.room_id}</p>
                              <Link href={`/booking/${schedule.movie_id}/${schedule.room_id}/${schedule.schedule_id}`}>
                <button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                  Đặt vé
                </button>
              </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-lg font-semibold text-gray-500">No schedules available</div>
                )}
              </div>
         
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
