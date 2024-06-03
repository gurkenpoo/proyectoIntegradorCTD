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
  Input,
  Skeleton,
} from '@chakra-ui/react';
import { Product } from '@/app/admin/types';


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
          bg={useColorModeValue('#FFFFFF', 'gray.800')}
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
  const [searchText, setSearchText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchText, selectedCategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filterProducts = () => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchText) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
    }

    filtered = shuffleArray(filtered); 
    setFilteredProducts(filtered.slice(0, 10));
  };

  return (
    <Box>
      <Heading as="h1" size="xl" mb={6} textAlign="center" mt={8} color={'#b592c3'}>
        Lista de Productos
      </Heading>
      <Center>
        <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={40}>
          <Select
            color={'#8D8D8D'}
            placeholder='Filtrar por Categoria'
            width={400}
            textAlign="center"
            onChange={handleCategoryChange}>
            <option value='Tour de Degustación Tradicional'>Tour de Degustación Tradicional</option>
            <option value='Tour de Maridaje de Vinos y Comida'>Tour de Maridaje de Vinos y Comida</option>
            <option value='Tour de Vendimia'>Tour de Vendimia</option>
            <option value='Tour de Paisajes y Viñedos'>Tour de Paisajes y Viñedos</option>
          </Select>
          <Input
            placeholder="Buscar por nombre"
            width={400}
            value={searchText}
            onChange={handleSearchChange}
          />
        </Stack>
      </Center>

      
      {loading ? (
        <Center>
          <Skeleton height="200px" width="80%" my="20px" /> 
        </Center>
      ) : (
        <SimpleGrid bgColor={"#c9bbde47"} columns={2} spacing={4}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          <Stack id='ListaProductos'></Stack>
        </SimpleGrid>
      )}
    </Box>
  );
};

export default ProductList;