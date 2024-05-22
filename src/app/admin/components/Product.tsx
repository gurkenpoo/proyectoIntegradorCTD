'use client';
import React, { useState } from 'react';
import { Box, Center, Heading, Text, Stack, Image } from '@chakra-ui/react';

interface ProductProps {
  name: string;
  description: string;
  imageURL: string;
  originalPrice: number;
  discountPrice: number;
}

const Product: React.FC<ProductProps> = ({ name, description, imageURL, originalPrice, discountPrice }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={'white'}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 5,
            left: 0,
            backgroundImage: `url(${imageURL})`,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={imageURL}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              ${discountPrice}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              ${originalPrice}
            </Text>
          </Stack>
          {showDetails ? (
            <div>
              <p>Descripción: {description}</p>
              <button onClick={toggleDetails} className="btn-details">Ocultar detalles</button>
            </div>
          ) : (
            <button onClick={toggleDetails} className="btn-details">Ver detalles</button>
          )}
        </Stack>
      </Box>
    </Center>
  );
};

export default Product;
