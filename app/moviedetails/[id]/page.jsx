'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/movie/${id}`);
        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);  
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-center text-gray-700 mt-40">Loading movie details...</div>;
  if (!movie) return <div className="text-center text-red-600 mt-40">Movie not found.</div>;

  return (
    <div className="bg-gray-50 text-gray-900">
      <p className="text-gray-800 text-center mt-20 text-2xl font-semibold tracking-wide uppercase">Movie Information</p>
      <div className="flex flex-col lg:flex-row justify-center min-h-screen max-w-screen-2xl px-6 lg:px-20 gap-12 lg:gap-20 py-20">
        
        <div className="lg:w-1/3 w-full">
          <img
            className="w-full h-auto rounded-lg mb-6 shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
            src={movie.movie_poster}
            alt={movie.movie_name}
          />
        </div>
        
        <div className="lg:w-2/3 w-full space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">{movie.movie_name}</h1>
          <p className="text-gray-600 text-lg">{movie.movie_description}</p>
          <p className="text-gray-700">
            <strong className="text-gray-800">Ngày ra mắt:</strong> {new Date(movie.movie_release).toLocaleDateString('en-US')}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-800">Độ tuổi :</strong> {movie.movie_cens}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-800">Thể loại:</strong> {movie.movie_genres}
          </p>
        </div>
      </div>
      
      {/* Trailer Section */}
      <div className=" bg-slate-500">
        <h2 className="text-xl font-semibold text-black mt-10 flex justify-center ">Trailer</h2>
        {movie.movie_trailer ? (
          <div className="flex justify-center mt-4 mb-6">
          <iframe
            className="w-full lg:w-2/3 aspect-video rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${movie.movie_trailer.split('v=')[1]}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        ) : (
          <p className="text-gray-600 mt-4">Trailer not available.</p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
