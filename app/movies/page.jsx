'use client';
import React, { useState, useEffect } from 'react';

export default function ShowTimes() {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [showModal, setShowModal] = useState(false); 

  useEffect(() => {
    const apiKey = '4cf651776676f9ec6fdc59deea94b565';
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  const handleShowTrailer = (movieId) => {
    setLoading(true); 
    const apiKey = '4cf651776676f9ec6fdc59deea94b565';
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        const trailerData = data.results.find(video => video.type === 'Trailer');
        if (trailerData) {
          setTrailer(trailerData);
          setShowModal(true); 
        } else {
          alert('Trailer not found for this movie.');
          setTrailer(null);
        }
        setLoading(false); 
      })
      .catch(error => {
        console.error('Error fetching trailer:', error);
        setLoading(false); 
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setTrailer(null); 
  };

  return (
    <div className="mt-40">
      <h1 className="text-black text-3xl font-bold mb-6 m-10 text-center">Upcoming Movies</h1>
      <div className="grid grid-cols-4 gap-6">
        {movies.map(movie => (
          <div key={movie.id} className="bg-white shadow-lg p-4 rounded-lg">
            <img 
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
              alt={movie.title} 
              className="w-full h-auto rounded-lg mb-4 max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer"
              onClick={() => handleShowTrailer(movie.id)} 
            />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-gray-700">Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>
      {loading && <p>Loading trailer...</p>}
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
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title={trailer.name}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
