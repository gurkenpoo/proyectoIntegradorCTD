'use client';
import React, { useEffect, useState } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
} from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  imageURL: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const IMAGE = product.imageURL;

  return (
    <Center py={2}>
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
            backgroundImage: `url(${IMAGE})`,
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
            src={IMAGE}
            alt={product.name}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            Brand
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {product.name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              ${product.originalPrice}
            </Text>
            <Text textDecoration={'line-through'} color={'gray.600'}>
              ${product.discountPrice}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const allProducts: Product[] = JSON.parse(storedProducts);
      // Selecciona aleatoriamente hasta 10 productos
      const shuffledProducts = allProducts.sort(() => 0.5 - Math.random());
      setProducts(shuffledProducts);
    }
  }, []);

  return (
    <Box
      maxH="600px" // Altura máxima del contenedor
      overflowY="auto" // Habilita el scroll vertical
      p={4}
      borderWidth="1px"
      borderRadius="lg">
      <SimpleGrid columns={2} spacing={4}>
        {products.slice(0, 10).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
