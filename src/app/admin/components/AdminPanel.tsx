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
  Select,
  useToast
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
}

interface Props {
  onAddProduct: (newProduct: Product) => void;
}

const AdminPanel: React.FC<Props> = ({ onAddProduct }) => {
  const toast = useToast();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [categories, setCategories] = useState<string[]>([
    'Tour de Degustación Tradicional',
    'Tour de Maridaje de Vinos y Comida',
    'Tour de Vendimia',
    'Tour de Paisajes y Viñedos',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
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

    const storedProducts = localStorage.getItem('products');
    const existingProducts: Product[] = storedProducts ? JSON.parse(storedProducts) : [];

    // Calcular el newId de forma segura
    const newId = existingProducts.length > 0
      ? Math.max(...existingProducts.map(product => product.id || 0)) + 1
      : 1;

    const newProduct: Product = {
      id: newId,
      name: productName,
      description: productDescription,
      imageUrls: [],
      originalPrice: isNaN(originalPriceValue) ? 0 : originalPriceValue,
      discountPrice: isNaN(discountPriceValue) ? 0 : discountPriceValue,
      category: categoryToUse,
    };

    for (const file of imageFiles) {
      if (file) {
        const imageUrl = await convertFileToUrl(file);
        newProduct.imageUrls.push(imageUrl);
      }
    }

    if (newProduct.imageUrls.length === 0) {
      setErrorMessage('Debes agregar al menos una imagen');
      return;
    }

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
    setSelectedCategory('');
    setNewCategory('');
    setErrorMessage('');

    // Mostrar el toast solo si no hay errores
    toast({
      title: 'Agregado',
      description: 'El Tour/Producto fue agregado correctamente',
      status: 'success',
      duration: 3000, // Cambia la duración según tus necesidades
      isClosable: true,
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory('');
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
            aria-label="Agregar Imagen"
            icon={<AddIcon />}
            onClick={addImageField}
            colorScheme="teal"
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
          <FormLabel htmlFor="newCategory" mt={4}>Agregar Nueva Categoría:</FormLabel>
                    <Input
            type="text"
            id="newCategory"
            placeholder="Nueva categoría"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button mt={2} onClick={handleAddCategory} colorScheme="teal">
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
            colorScheme="teal" 
            onClick={() => {
              handleAddProduct();
            }}
          >
            Agregar Producto
          </Button>
        </Center>
      </Stack>
    </Box>
  );
};

export default AdminPanel;