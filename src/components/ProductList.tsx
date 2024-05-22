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
} from '@chakra-ui/react';

interface Product {
  id: number; // Agrega la propiedad id para facilitar la identificación de los productos
  name: string;
  originalPrice: number;
  discountPrice: number;
  imageUrls: string[]; // Array para almacenar las URLs de las imágenes
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
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
        <Stack spacing={4}>
          {/* Mostrar la primera imagen del array imageUrls */}
          {product.imageUrls.length > 0 && (
            <Box>
              <Image
                rounded={'lg'}
                height={230}
                width={282}
                objectFit={'cover'}
                src={product.imageUrls[0]} // Usar la primera URL del array
                alt={product.name}
              />
            </Box>
          )}
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

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error al parsear los productos:', error);
        // Puedes manejar el error de diferentes formas:
        // 1. Mostrar un mensaje de error al usuario
        // 2. Inicializar products con un array vacío
      }
    }
  }, []);

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6} textAlign="center" mt={8}>
        Lista de Productos
      </Heading>
      <SimpleGrid columns={2} spacing={4}>
        {products.map((product, index) => (
          // Verifica que product.imageUrls no sea undefined antes de mostrarlo
          product.imageUrls && (
            <ProductCard key={index} product={product} />
          )
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProductList;