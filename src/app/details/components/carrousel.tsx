import React from 'react';
import Slider from 'react-slick';
import { Box } from '@chakra-ui/react';

interface Props {
  productImageUrls: string[];
}

const ProductCarousel: React.FC<Props> = ({ productImageUrls }) => {
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
      <Slider {...settings}>
        {productImageUrls.map((imageUrl, index) => (
          <Box
            key={index}
            height={'100%'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${imageUrl})`}
          />
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
