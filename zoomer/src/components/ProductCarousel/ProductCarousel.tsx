import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

type ProductCarouselProps = {
  images: string[];
};

const ProductCarousel = ({ images }: ProductCarouselProps) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setActiveSlide((prevSlide) =>
      prevSlide === images.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <img
        src={images[activeSlide]}
        alt={`Product ${activeSlide}`}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
      <div style={{ position: 'absolute', top: '50%', left: '10px' }}>
        <IconButton onClick={handlePrevSlide}>
          <ChevronLeft />
        </IconButton>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '10px' }}>
        <IconButton onClick={handleNextSlide}>
          <ChevronRight />
        </IconButton>
      </div>
    </div>
  );
};

export default ProductCarousel;
