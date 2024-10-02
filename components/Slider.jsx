'use client';

import React, { useState } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs'; 
import { RxDotFilled } from 'react-icons/rx'; 

function Slider() {
  const slides = [
    {
      src: '/img/1702x621-16-093249-270824-49.jpg',
    },
    {
      url: '/img/deal-hoang-hot-59k-1702x621-png-093147-200824-49.jpg',
    },
    {
      url: '/img/deal-hoang-hot-59k-1702x621-png-093147-200824-49.jpg',
    },
    
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-full h-[670px] w-full  relative group'>
      <div
         style={{
          backgroundImage: `url(${slides[currentIndex].src || slides[currentIndex].url})`, 
        }}  
        className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
      ></div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl  bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl  bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer text-black'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
