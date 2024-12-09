'use client';
import React, { useState, useEffect } from 'react';

export default function Content() {
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pageSize = 8; 

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const fetchMovies = (page) => {
    const apiKey = '4cf651776676f9ec6fdc59deea94b565';
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${page}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results.slice(0, pageSize)); 
        setTotalPages(data.total_pages);
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pageButtons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 mx-1 rounded ${currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex justify-center mt-4 p-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        {pageButtons}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 bg-gray-400 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div>
      <h1 className="text-black text-3xl font-bold mb-6 text-center p-10  ">Phim sắp chiếu</h1>
      <div className="grid grid-cols-4 gap-6 items-center justify-center">
        {movies.map((movie) => (
        <div key={movie.id}>
       <div  className="relative shadow-lg p-4 rounded-lg group">
          <img
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-full object-cover rounded-lg  max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer"
        onClick={() => handleShowTrailer(movie.id)}
      />

     <button
       className="absolute inset-0 flex items-center justify-center bg-black  bg-opacity-50 text-white text-4xl font-bold rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
       onClick={() => handleShowTrailer(movie.id)}
     >
       ▶
     </button>
     <h2 className="text-black text-lg font-semibold flex justify-center ">{movie.title}</h2>
     </div>
    
   </div>
   
        ))}
      </div>
      {loading && <p>Loading trailer...</p>}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 ">
          <div className="bg-white p-10 rounded-lg relative max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-black font-bold "
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
      {renderPagination()}
    </div>
  );
}
