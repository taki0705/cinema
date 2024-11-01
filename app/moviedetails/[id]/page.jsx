'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const MovieDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = '4cf651776676f9ec6fdc59deea94b565';

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
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

  if (loading) return <div>Loading movie details...</div>;

  if (!movie) return <div>Movie not found.</div>;

  return (
    <div className="flex flex-col lg:flex-row justify-center min-h-screen max-w-screen-2xl p-20 gap-10 ml-20">
    <div className="lg:w-1/4 md:w-1/4 sm:w-1/4 w-full">
        <img 
            className="w-full h-auto rounded-lg mb-4 max-w-xs transition duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer" 
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
            alt={movie.title} 
        />
    </div>
    <div className="lg:w-3/4 md:w-3/4 sm:w-3/4 w-full">
        <h1 className="font-bold uppercase font-sans text-xl">{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
    </div>
</div>

  );
};

export default MovieDetails;
