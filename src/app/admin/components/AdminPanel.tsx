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
  IconButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface Product {
  name: string;
  description: string;
  imageUrls: string[]; // Array de URLs de las imágenes (Base64 o del servidor)
  originalPrice: number;
  discountPrice: number;
}

interface Props {
  onAddProduct: (newProduct: Product) => void;
}

const AdminPanel: React.FC<Props> = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const convertFileToUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAddImage = async (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = files[0];
      setImageFiles(newImageFiles);

      try {
        const imageUrl = await convertFileToUrl(files[0]);
        console.log(imageUrl); // Puedes usar esta URL en la imagen del producto
      } catch (error) {
        console.error('Error converting file to URL:', error);
      }
    }
  };

  const addImageField = () => {
    setImageFiles([...imageFiles, null as any]);
  };

  const handleAddProduct = async () => { // Cambia a async para manejar las promesas de convertFileToUrl
    const originalPriceValue = originalPrice.trim() !== '' ? parseFloat(originalPrice) : 0;
    const discountPriceValue = discountPrice.trim() !== '' ? parseFloat(discountPrice) : 0;

    const newProduct: Product = {
      name: productName,
      description: productDescription,
      imageUrls: [], // Inicializa imageUrls como un array vacío
      originalPrice: isNaN(originalPriceValue) ? 0 : originalPriceValue,
      discountPrice: isNaN(discountPriceValue) ? 0 : discountPriceValue,
    };

    // Convertir las imágenes a Base64 y guardarlas en imageUrls
    for (const file of imageFiles) {
      if (file) {
        const imageUrl = await convertFileToUrl(file);
        newProduct.imageUrls.push(imageUrl); // Agrega la URL al array
      }
    }

    // Verifica si se agregaron imágenes
    if (newProduct.imageUrls.length === 0) {
      setErrorMessage('Debes agregar al menos una imagen');
      return;
    }

    const storedProducts = localStorage.getItem('products');
    const existingProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

    const productExists = existingProducts.some(product => product.name === newProduct.name);

    if (productExists) {
      setErrorMessage('Un producto con este nombre ya existe.');
      return;
    }

    onAddProduct(newProduct);

    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    setProductName('');
    setProductDescription('');
    setImageFiles([]);
    setOriginalPrice('');
    setDiscountPrice('');
    setErrorMessage('');
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} p={4} borderRadius="lg">
      <Stack spacing={4}>
        <Heading fontSize="xl" mb={4}>Admin Panel</Heading>

        {errorMessage && (
          <Text color="red.500" textAlign="center">
            {errorMessage}
          </Text>
        )}

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
          <FormLabel>Imágenes del Producto:</FormLabel>
          {imageFiles.map((file, index) => (
            <Input
              key={index}
              type="file"
              onChange={(e) => handleAddImage(e, index)}
              mb={2}
            />
          ))}
          <IconButton
            aria-label="Agregar Imagen"
            icon={<AddIcon />}
            onClick={addImageField}
            colorScheme="teal"
            mb={2}
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