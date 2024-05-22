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
    title: 'Viña no se me ocurre nada mas',
    price: '$37.000',
    image: 'https://enotourchile.com/wp-content/uploads/2016/05/2-150x150.jpg',
  },
  {
    title: 'City Tour Republica y algo mas',
    price: '$25.000',
    image: 'https://enotourchile.com/wp-content/uploads/2016/05/1-1-150x150.jpg',
  },
  {
    title: 'Vino, Salvador',
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
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
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
            backgroundImage: `url(${image})`,
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
            src={image}
            alt="#"
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
            {title}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              {price}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

const ProductShowcase: React.FC = () => {
  return (
    <Box bg="#F9EFEE" py={10}>
      <Container maxW="container.xl">
        <Heading as="h2" size="xl" color="#B1A69C" mb={6} textAlign="center">
          LO MAS DESTACADO | VEN A CONOCER LO ULTIMO EN TOURS!
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
