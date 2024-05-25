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
  Link,
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
  return (
    <Box
      as={Link}
      href={`/details/${product.id}`}
      _hover={{
        textDecoration: 'none',
      }}
      cursor="pointer">
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
    </Box>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      try {
        const parsedProducts: Product[] = JSON.parse(storedProducts);
        setProducts(parsedProducts);
      } catch (error) {
        console.error('Error al parsear los productos:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const randomProducts = getRandomProducts(products);
      setFilteredProducts(randomProducts);
    }
  }, [products]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const category = event.target.value;
    const filtered = category === '' ? products : products.filter(product => product.category === category);
    const randomFilteredProducts = getRandomProducts(filtered);
    setFilteredProducts(randomFilteredProducts);
  };

  const getRandomProducts = (products: Product[]) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(shuffled.length, 10));
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6} textAlign="center" mt={8}>
        Lista de Productos
      </Heading>
      <Center>
        <Select
          placeholder='Filtrar por Categoria'
          width={400}
          textAlign="center"
          onChange={handleCategoryChange}
        >
          <option value='Tour de Degustación Tradicional'>Tour de Degustación Tradicional</option>
          <option value='Tour de Maridaje de Vinos y Comida'>Tour de Maridaje de Vinos y Comida</option>
          <option value='Tour de Vendimia'>Tour de Vendimia</option>
          <option value='Tour de Paisajes y Viñedos'>Tour de Paisajes y Viñedos</option>
        </Select>
      </Center>
      <SimpleGrid   columns={2} spacing={4}>
        {filteredProducts.map(product => (
          <ProductCard  key={product.id} product={product} />
        ))}
        <Stack id='ListaProductos'></Stack>
      </SimpleGrid >
    </Box>
  );
};

export default ProductList;
