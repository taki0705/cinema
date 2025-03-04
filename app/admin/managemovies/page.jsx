"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const MovieTable = () => {
  const [movies, setMovies] = useState([]);
 const router=useRouter();
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/movie/all");
      console.log(response.data);
      localStorage.setItem("movie_id",response.data.movie_id);
      setMovies(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách phim:", error);
    }
  };

  return (
    <div className="absolute p-6 ml-20">
      <div className="text-2xl font-bold mb-4">Danh sách phim</div>
      <table className="border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-600 text-white">
            <th className="border p-2 w-12">ID</th>
            <th className="border p-2 w-64">Tên phim</th> {/* Tăng chiều rộng */}
            <th className="border p-2">Nội Dung</th>
            <th className="border p-2">Độ Tuổi</th>
            <th className="border p-2">Thể loại</th>
            <th className="border p-2">Ngày ra mắt</th>
            <th className="border p-2">Đồ họa</th>
            <th className="border p-2">Đồ dài</th>
            <th className="border p-2 w-32">Trailer</th>
            <th className="border p-2 w-32">Poster</th>
            <th className="border p-2 w-32">Hoạt động</th>  {/* Giữ poster gọn gàng */}
          </tr>
        </thead>
        <tbody>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <tr key={movie.movie_id} className="hover:bg-gray-100">
                <td className="border p-2 text-center">{movie.movie_id}</td>
                <td className="border p-2 w-64 font-semibold">{movie.movie_name}</td> {/* Cột tên to hơn */}
                <td className="border p-2">{movie.movie_description}</td>
                <td className="border p-2 text-center">{movie.movie_cens}</td>
                <td className="border p-2">{movie.movie_genres}</td>
                <td className="border p-2 text-center">{movie.movie_release}</td>
                <td className="border p-2 text-center">{movie.movie_format}</td>
                <td className="border p-2 text-center">{movie.movie_length}</td>
                <td className="border p-2 text-center">  <iframe
            className="w-full lg:w-2/3 aspect-video rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${movie.movie_trailer.split('v=')[1]}`}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe></td>
                <td className="border p-2 text-center">
                  <img
                    src={movie.movie_poster}
                    alt="Movie Poster"
                    className="w-20 h-28 object-cover rounded-md mx-auto"
                  />
                </td>
                    <th className="border p-2 w-32">  <button
                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                            onClick={() => router.push(`/admin/edit/${movie_id}`)}
                        > Chỉnh sửa</button> </th>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="border p-2 text-center text-gray-500">
                Đang tải dữ liệu...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MovieTable;
