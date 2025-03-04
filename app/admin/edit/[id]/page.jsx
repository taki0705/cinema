"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const EditMovie = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const updatesuccess=() =>{
    toast.success('Cập nhập thành công,',{
      position: "top-center",
      autoClose: 3000,
      className: "z-[9999] !important",
    })
  }

  const [movie, setMovie] = useState({
    movie_name: "",
    movie_description: "",
    movie_cens: "",
    movie_genres: "",
    movie_release: "",
    movie_format: "",
    movie_length: "",
    movie_trailer: "",
    movie_poster: "",
  });

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/movie/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin phim:", error);
    }
  };

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/movie/${id}`, movie);
      alert("Cập nhật phim thành công!");
      updatesuccess();
      router.push("/admin/managemovies"); 
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-2/3 bg-white p-6 rounded-lg shadow-lg">

      <div className="text-2xl font-bold mb-4 text-center">Chỉnh sửa phim</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Tên phim:</label>
          <input
            type="text"
            name="movie_name"
            value={movie.movie_name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Mô tả:</label>
          <textarea
            name="movie_description"
            value={movie.movie_description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Độ tuổi:</label>
            <input
              type="text"
              name="movie_cens"
              value={movie.movie_cens}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Thể loại:</label>
            <input
              type="text"
              name="movie_genres"
              value={movie.movie_genres}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Ngày ra mắt:</label>
            <input
              type="date"
              name="movie_release"
              value={movie.movie_release}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700">Định dạng:</label>
            <input
              type="text"
              name="movie_format"
              value={movie.movie_format}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Độ dài phim:</label>
          <input
            type="text"
            name="movie_length"
            value={movie.movie_length}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Trailer:</label>
          <input
            type="text"
            name="movie_trailer"
            value={movie.movie_trailer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Poster:</label>
          <input
            type="text"
            name="movie_poster"
            value={movie.movie_poster}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {movie.movie_poster && (
            <img
              src={movie.movie_poster}
              alt="Movie Poster"
              className="mt-2 w-32 h-48 object-cover rounded-lg"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
};

export default EditMovie;
