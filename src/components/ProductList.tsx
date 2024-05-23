'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Select,
} from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  imageUrls: string[];
  category: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const handleClick = () => {
    // Aquí puedes definir la lógica para manejar el clic en el producto
    console.log('Producto clickeado:', product);
  };

  return (
    <Center py={12} onClick={handleClick} cursor="pointer">
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
        <Stack spacing={4}>
          {product.imageUrls.length > 0 && (
            <Box>
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={product.imageUrls[0]}
                alt={product.name}
              />
            </Box>
          )}
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            {product.category}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            {product.name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'xl'}>
              ${product.originalPrice}
            </Text>
            {product.discountPrice > 0 && (
              <Text textDecoration={'line-through'} color={'gray.600'}>
                ${product.discountPrice}
              </Text>
            )}
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        setProducts(parsedProducts);
        // Obtén 10 productos aleatorios de la lista completa
        const randomIndices = getRandomIndices(parsedProducts.length, 10);
        const randomProducts = randomIndices.map(index => parsedProducts[index]);
        setRandomProducts(randomProducts);
      } catch (error) {
        console.error('Error al parsear los productos:', error);
      }
    }
  }, []);

  const getRandomIndices = (max: number, count: number) => {
    const indices: number[] = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6} textAlign="center" mt={8}>
        Lista de Productos
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        {randomProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;
