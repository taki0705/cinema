'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Page = () => {
  const [movies, setMovies] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // Add this state
  const apiKey = '4cf651776676f9ec6fdc59deea94b565';

  useEffect(() => {
    setIsClient(true); // Ensure client-side rendering
  }, []);

  const getFormattedDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${day}/${month} - ${dayOfWeek}`;
  };

  const generateNext7Days = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() -  i);
      return newDate.toISOString().split('T')[0];
    });
  };

  const upcomingDays = generateNext7Days();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchMovies();
    }
  }, [isClient]);

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="mt-40" >
      < div className="flex flex-row text-black ml-60 p-5 " >
        {upcomingDays.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col text-gray-600 pr-5 uppercase font-bold text-2xl hover:text-blue-500 cursor-pointer ${selectedDate === day ? 'text-blue-500' : ''}`}
            onClick={() => handleDateClick(day)}
          >
            {getFormattedDate(new Date(day))}
          </div>
        ))}
      </div>

      {loading ? (
        <div className="mt-10 ml-60">Loading movies...</div>
      ) : (
        selectedDate && (
          <div className="mt-10 ml-60">
            <div className="flex flex-col p-6 bg-gray-100">
              {movies
                .filter((movie) => {
                  const releaseDate = new Date(movie.release_date);
                  const startDate = new Date(selectedDate);
                  const endDate = new Date(selectedDate);
                  endDate.setDate(endDate.getDate() + 7);
                  return releaseDate >= startDate && releaseDate <= endDate;
                })
                .map((movie) => (
                  <div key={movie.id} className="bg-white shadow-lg p-20 rounded-lg flex flex-row py-4" >
             
                      <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-auto rounded-lg mb-4 max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer"
                      />
                  
                    <div className="p-10 " >
                    <Link href={`/moviedetails/${movie.id}`}><h2 className="text-lg font-semibold text-blue-400 hover:text-red-500 hover:underline">{movie.title}</h2></Link>
                    <p className="text-gray-700 p-2">Phim Hài</p>
                    <p className="p-2">111 Phút</p>
                    <Link href="/booking">
                    <button className="bg-gray-400 px-6 py-3 ml-2 relative group ">
                    <span className="group-hover:opacity-0 hover:text-red-500">12:00</span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 text-red-500 ">
                      Đặt vé
                    </span>
                  </button>
                  </Link> 
                
                    </div>
                    </div>
                ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Page;
