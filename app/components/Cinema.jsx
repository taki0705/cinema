'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Cinema = () => {
  const [cinemaData, setCinemaData] = useState(null);
  const [cinemaId, setCinemaId] = useState(null);
  const [movies, setMovies] = useState([]);  

  
  useEffect(() => {
    const storedCinemaId = localStorage.getItem('selectedCinema');
    if (storedCinemaId) {
      setCinemaId(storedCinemaId);
    }
  }, []);
  useEffect(() => {
    if (cinemaId) {
      fetch(`http://localhost:8080/cinema/${cinemaId}`)
      .then(response => response.json())
      .then(data => {
        setCinemaData(data);
        console.log(data);  
      })
       
        .catch((error) => console.error('Error fetching cinema data:', error));
    }
  }, [cinemaId]);


  useEffect(() => {
    fetch(`http://localhost:8080/movie/all`)
      .then(response => response.json())
      .then(data => {
        setMovies(data);
        console.log(data);  
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  if (!cinemaData) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex mt-40 py-20 px-20">
      <div className="w-1/2 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">{cinemaData.cinema_name}</h2>
        <img src={cinemaData.cinema_img} alt={cinemaData.cinema_name} />
        <p>{cinemaData.cinema_details}</p>
      </div>

  
      <div className="w-1/2 bg-white p-4">
        <h2 className="text-xl font-bold mb-4 flex justify-center">Phim Đang Hot</h2>
        <div className="grid grid-cols-2 gap-4 "> 
          {movies.slice(-4).map((movie) => (
            <div key={movie.movie_id} className="mb-4">
             
              <img
                className="w-full  max-w-xs h-auto   rounded-2xl"
                src={movie.movie_poster} 
                alt={movie.movie_title}
              />
               <Link href={`/moviedetails/${movie.movie_id}`}>
               <h3 className="text-lg font-semibold flex justify-center  text-blue-600 hover:text-red-500">{movie.movie_name}</h3>
            </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cinema;
