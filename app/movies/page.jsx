'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

export default function ShowTimes() {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // To track current position in the carousel
  const moviesPerPage = 5; // Show 5 movies at a time (including the center one)

  useEffect(() => {
    fetch(`http://localhost:4000/movies`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.movie);
        console.log(data.movie);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleShowTrailer = (movie_id) => {
    setLoading(true);
    const movie = movies.find(m => m.movie_id === movie_id);
    if (movie && movie.movie_trailer) {
      setTrailer(movie.movie_trailer);
      setShowModal(true);
    } else {
      alert('Trailer not found for this movie.');
      setTrailer(null);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
    setTrailer(null);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (movies.length));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % (movies.length));
  };

  const getScaledClass = (index) => {
    
    const diff = Math.abs(index - currentIndex);
    if (diff === 0) return 'scale-110'; 
    if (diff === 1) return 'scale-100'; 
    return 'scale-90'; 
  };

  return (
    <div className="mt-40">
      <h1 className="text-black text-3xl font-bold mb-6 mt-10 p-10 text-center font-weight-bold my-0 text-uppercase">
        Phim đang chiếu
      </h1>

      <div className="relative overflow-hidden">
     
        <div className="flex gap-6 transition-all duration-500 " style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
          {movies.map((movie, index) => (
            <div
              key={movie.movie_id}
              className={`relative group w-72 cursor-pointer transform transition-all duration-300 ease-in-out ${getScaledClass(index)}`}
              style={{ flex: '0 0 auto' }}
            >
          
              <div className="relative  group cursor-pointer hover:scale-110 hover:z-10 transition-transform duration-300 ease-in-out ">
                <img
                  src={movie.movie_poster}
                  alt={movie.movie_name}
                  className="w-full h-auto rounded-lg mb-4 max-w-xs"
                />
                {/* Play button overlay */}
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-4xl font-bold rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={() => handleShowTrailer(movie.movie_id)}
                >
                  ▶
                </button>
              </div>
              <Link href={`/moviedetails/${movie.movie_id}`}>
                <h2 className="text-lg font-semibold text-blue-600 hover:text-red-500">
                  {movie.movie_name}
                </h2>
              </Link>
            </div>
          ))}
        </div>

        {/* Previous button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        >
          &#8592;
        </button>

        {/* Next button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
        >
          &#8594;
        </button>

        {/* Loading spinner */}
        {loading && <p>Loading trailer...</p>}

        {/* Trailer modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-white p-4 rounded-lg relative max-w-lg w-full">
              <button
                className="absolute top-2 right-2 text-black font-bold"
                onClick={closeModal}
              >
                &times;
              </button>
              {trailer && (
                <>
                  <h2 className="text-xl font-bold mb-2">Trailer for {trailer.name}</h2>
                  <iframe
                    width="100%"
                    height="315"
                    src={`https://www.youtube.com/embed/${new URL(trailer).searchParams.get('v')}`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
