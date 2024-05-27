'use client';

import React from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';

// Datos de las tarjetas
const cardData = [
  {
    title: 'Viña Haras de Pirque',
    price: '$37.000',
    image: 'https://enotourchile.com/wp-content/uploads/2016/05/2-150x150.jpg',
  },
  {
    title: 'City Tour Santiago y Pueblito los Dominicos',
    price: '$25.000',
    image: 'https://enotourchile.com/wp-content/uploads/2016/05/1-1-150x150.jpg',
  },
  {
    title: 'Vino, Valparaíso y Viña del Mar',
    price: '$45.000',
    image: 'https://enotourchile.com/wp-content/uploads/2016/05/CITY1-1-150x150.jpg',
  },
];

const ProductCard: React.FC<{ title: string; price: string; image: string }> = ({
  title,
  price,
  image,
}) => {
  return (
    <Center py={6}>
      <Box
        role={'group'}
        p={6}
        maxW={'400px'}
        w={'full'}
        bg={useColorModeValue('#FFFFFF ', 'gray.800')}
        
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}>
        <Box
          rounded={'lg'}
          mt={-1}
          pos={'relative'}
          height={'300px'}
          _after={{
            transition: 'all .3s ease',
            content: '""',
            w: 'full',
            h: 'full',
            pos: 'absolute',
            top: 0,
            left: 0,
            backgroundImage: `url(${image}) `,
            filter: 'blur(15px)',
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: 'blur(10px)',
            },
          }}>
          <Image
            rounded={'lg'}
            height={300}
            width={352}
            objectFit={'cover'}
            src={image}
            alt={title}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'lg'} fontFamily={'body'} fontWeight={500} textAlign={'center'} color={'#292864'}>
            {title}
          </Heading>
          <Text fontWeight={800} fontSize={'xl'}  color={'#292864'}>
            {price}
          </Text>
        </Stack>
      </Box>
    </Center>
  );
};

const ProductShowcase: React.FC = () => {
  return (
    <Box bg="#fcf5eb" py={10} mt={90}>
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" color="#b592c3" mb={6} textAlign="center">
          TOURS DESTACADOS | TU OPORTUNIDAD DE CONOCER LO MEJOR 
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {cardData.map((card, index) => (
            <ProductCard key={index} title={card.title} price={card.price} image={card.image} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default ProductShowcase;
