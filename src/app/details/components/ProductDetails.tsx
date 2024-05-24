'use client';
import React, { useState } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
}

const ProductViewer: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleFetchProduct = () => {
    const storedProducts = localStorage.getItem('products');
    const products: Product[] = storedProducts ? JSON.parse(storedProducts) : [];
    const foundProduct = products.find((prod) => prod.id === Number(productId));
    
    if (foundProduct) {
      setProduct(foundProduct);
      setErrorMessage('');
    } else {
      setProduct(null);
      setErrorMessage('Producto no encontrado');
    }
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} p={4} borderRadius="lg">
      <Stack spacing={4}>
        <Heading fontSize="xl" mb={4}>Buscar Producto</Heading>

        <FormControl>
          <FormLabel htmlFor="productId">ID del Producto:</FormLabel>
          <Input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="teal" onClick={handleFetchProduct}>
          Buscar Producto
        </Button>

        {errorMessage && (
          <Text color="red.500" textAlign="center">
            {errorMessage}
          </Text>
        )}

        {product && (
          <Box p={4} borderRadius="md" bg={useColorModeValue('white', 'gray.800')} boxShadow="lg">
            <Heading fontSize="lg" mb={2}>{product.name}</Heading>
            <Text mb={2}><strong>Descripción:</strong> {product.description}</Text>
            <Text mb={2}><strong>Categoría:</strong> {product.category}</Text>
            <Text mb={2}><strong>Precio Original:</strong> ${product.originalPrice.toFixed(2)}</Text>
            <Text mb={2}><strong>Precio con Descuento:</strong> ${product.discountPrice.toFixed(2)}</Text>
            <Text mb={2}><strong>Imágenes:</strong></Text>
            <Stack spacing={2}>
              {product.imageUrls.map((url, index) => (
                <img key={index} src={url} alt={`Imagen ${index + 1}`} style={{ maxWidth: '100%' }} />
              ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ProductViewer;
