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
    image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'City Tour Republica y algo mas',
    price: '$25.000',
    image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
  },
  {
    title: 'Vino, Salvador',
    price: '$45.000',
    image: 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80',
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
