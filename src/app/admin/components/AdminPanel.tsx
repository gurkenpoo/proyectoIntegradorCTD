import React, { useState, useEffect } from 'react';
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
  Select,
  useToast
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Product } from '../types';

const AdminPanel: React.FC = () => {
  const toast = useToast();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [categories, setCategories] = useState<string[]>([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [newCategory, setNewCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const data: { name: string }[] = await response.json();
        setCategories(data.map(category => category.name));
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

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
        console.log(imageUrl);
      } catch (error) {
        console.error('Error converting file to URL:', error);
      }
    }
  };

  const addImageField = () => {
    setImageFiles([...imageFiles, null as any]);
  };

  const handleAddProduct = async () => {
    const originalPriceValue = originalPrice.trim() !== '' ? parseFloat(originalPrice) : 0;
    const discountPriceValue = discountPrice.trim() !== '' ? parseFloat(discountPrice) : 0;

    const categoryToUse = newCategory.trim() !== '' ? newCategory : selectedCategory;

    if (!categoryToUse) {
      setErrorMessage('Debes seleccionar o agregar una categoría.');
      return;
    }

    const imageUrlsBase64: string[] = [];
    for (const file of imageFiles) {
      if (file) {
        const imageUrlBase64 = await convertFileToUrl(file);
        imageUrlsBase64.push(imageUrlBase64);
      }
    }

    const newProduct: Omit<Product, "id"> = {
      name: productName,
      description: productDescription,
      imageUrls: imageUrlsBase64,
      originalPrice: originalPriceValue,
      discountPrice: discountPriceValue,
      category: categoryToUse,
    };

    try {
      console.log(newProduct)
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        console.log('Producto creado con éxito');
        // Puedes agregar aquí la lógica para mostrar un toast de éxito

        // Limpiar los campos del formulario
        setProductName('');
        setProductDescription('');
        setImageFiles([]);
        setOriginalPrice('');
        setDiscountPrice('');
        setSelectedCategory('');
        setNewCategory('');
        setErrorMessage('');
      } else {
        console.error('Error al crear el producto:', response.status);
        // Puedes agregar aquí la lógica para mostrar un toast de error
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      // Puedes agregar aquí la lógica para mostrar un toast de error
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        const data = await response.json();
        setCategories([...categories, data.category.name]);
        setNewCategory('');
        toast({
          title: 'Categoría agregada',
          description: `Se ha agregado la categoría ${data.category.name}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        console.error('Error al agregar la categoría:', response.status);
        toast({
          title: 'Error al agregar categoría',
          description: 'Ha ocurrido un error al agregar la categoría.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error al agregar la categoría:', error);
      toast({
        title: 'Error al agregar categoría',
        description: 'Ha ocurrido un error al agregar la categoría.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} p={4} borderRadius="lg" mt={90}>
      <Stack spacing={4}>
        <Heading fontSize="xl" mb={4}>Panel de Administracion</Heading>

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
            bg={'#b592c3'}
            aria-label="Agregar Imagen"
            icon={<AddIcon />}
            onClick={addImageField}
            colorScheme='blackAlpha'
            mb={2}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="category">Categoría:</FormLabel>
          <Select
            placeholder="Seleccionar categoría"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="newCategory" mt={4}>Agregar Nueva Categoría:</FormLabel>
          <Input
            type="text"
            id="newCategory"
            placeholder="Nueva categoría"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button mt={2} onClick={handleAddCategory} colorScheme='blackAlpha' bg={'#b592c3'}>
            Agregar Categoría
          </Button>
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
          <Button
            colorScheme='blackAlpha'
            bg={'#b592c3'}
            onClick={handleAddProduct}
          >
            Agregar Producto
          </Button>
        </Center>
      </Stack>
    </Box>
  );
};

export default AdminPanel;