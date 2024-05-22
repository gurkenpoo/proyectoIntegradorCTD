import React, { useState } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Textarea,
  Button,
} from '@chakra-ui/react';

interface Product {
  name: string;
  description: string;
  imageURL: string;
  originalPrice: number;
  discountPrice: number;
}

interface Props {
  onAddProduct: (newProduct: Product) => void;
}

const AdminPanel: React.FC<Props> = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImageURL, setProductImageURL] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');

  const handleAddProduct = () => {
    // Verifica si los campos de precio son válidos
    const originalPriceValue = originalPrice.trim() !== '' ? parseFloat(originalPrice) : 0;
    const discountPriceValue = discountPrice.trim() !== '' ? parseFloat(discountPrice) : 0;

    const newProduct: Product = {
      name: productName,
      description: productDescription,
      imageURL: productImageURL,
      originalPrice: isNaN(originalPriceValue) ? 0 : originalPriceValue,
      discountPrice: isNaN(discountPriceValue) ? 0 : discountPriceValue,
    };

    // Llama a la función proporcionada desde las props para agregar el nuevo producto
    onAddProduct(newProduct);

    // Guarda el nuevo producto en localStorage
    const storedProducts = localStorage.getItem('products');
    const existingProducts = storedProducts ? JSON.parse(storedProducts) : [];
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Limpia los campos después de agregar el producto
    setProductName('');
    setProductDescription('');
    setProductImageURL('');
    setOriginalPrice('');
    setDiscountPrice('');
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700'); // Ajusta el color de fondo según el modo de color

  return (
    <Box bg={bgColor} p={4} borderRadius="lg">
      <Stack spacing={4}>
        <Heading fontSize="xl">Admin Panel</Heading>

        <FormControl isRequired>
          <FormLabel htmlFor="productName">Nombre del Producto:</FormLabel>
          <Input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="productDescription">Descripción del Producto:</FormLabel>
          <Textarea
            id="productDescription"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="productImageURL">URL de la Imagen:</FormLabel>
          <Input
            type="text"
            id="productImageURL"
            value={productImageURL}
            onChange={(e) => setProductImageURL(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="originalPrice">Precio Original:</FormLabel>
          <Input
            type="number"
            id="originalPrice"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="discountPrice">Precio con Descuento:</FormLabel>
          <Input
            type="number"
            id="discountPrice"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </FormControl>

        <Center>
          <Button colorScheme="teal" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
        </Center>
      </Stack>
    </Box>
  );
};

export default AdminPanel;
