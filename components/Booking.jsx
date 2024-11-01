import React from 'react';

const Booking = () => {
  return (
    <div className="mt-40">
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold text-gray-700">Tee Yod: Quỷ Ăn Tạng Phần 2</h2>
          <p className="text-sm text-red-500">
            Theo quy định của cục điện ảnh, phim này không dành cho khán giả dưới 18 tuổi.
          </p>
        </div>

       
        <div className="mb-6 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <span>Ghế trống</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-700 rounded"></div>
            <span>Ghế đang chọn</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-400 rounded"></div>
            <span>Ghế đang được giữ</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span>Ghế đã bán</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            <span>Ghế đặt trước</span>
          </div>
        </div>

      
        <div className="mb-6 flex justify-center">
          <div className="grid grid-cols-12 gap-2">
          
            <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-sm">A1</div>
            <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center text-sm">A2</div>
            <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center text-white text-sm">A3</div>
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white text-sm">A4</div>
          </div>
        </div>

       
        <div className="flex justify-between items-start">
          {/* Movie Details */}
          <div className="space-y-2">
            <img src="" alt="Tee Yod Poster" className="w-40 h-60 object-cover" />
            <p>
              <strong>Thể loại:</strong> Kinh dị
            </p>
            <p>
              <strong>Thời lượng:</strong> 111 phút
            </p>
            <p>
              <strong>Rạp chiếu:</strong> Beta Thái Nguyên
            </p>
            <p>
              <strong>Ngày chiếu:</strong> 16/10/2024
            </p>
            <p>
              <strong>Giờ chiếu:</strong> 13:00
            </p>
            <p>
              <strong>Phòng chiếu:</strong> P2
            </p>
          </div>

        
          <div className="space-y-4">
            <p>
              <strong>Tổng tiền:</strong> 150,000đ
            </p>
            <div className="text-center">
              <span className="font-semibold">Thời gian còn lại: 9:8</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Booking;
