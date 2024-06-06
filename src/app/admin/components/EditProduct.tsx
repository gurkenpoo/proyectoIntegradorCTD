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
  useToast,
  SimpleGrid,
  Image,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Product } from '../types';

const EditProduct: React.FC = () => {
  const toast = useToast();
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        const data: { name: string }[] = await response.json();
        setCategories(data.map((category) => category.name));
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const foundProduct = products.find((p) => p.name === selectedProduct);
    setProduct(foundProduct || null);
    if (foundProduct) {
      setProductName(foundProduct.name);
      setProductDescription(foundProduct.description);
      setOriginalPrice(foundProduct.originalPrice.toString());
      setDiscountPrice(foundProduct.discountPrice.toString());
      setSelectedCategory(foundProduct.category);
    }
  }, [selectedProduct, products]);

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

  const handleAddImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
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

  const handleUpdateProduct = async () => {
    if (!product) {
      toast({
        title: 'Error al actualizar producto',
        description: 'Primero debes seleccionar un producto.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const originalPriceValue = originalPrice.trim() !== '' ? parseFloat(originalPrice) : 0;
    const discountPriceValue = discountPrice.trim() !== '' ? parseFloat(discountPrice) : 0;

    const imageUrlsBase64: string[] = [];
    for (const file of imageFiles) {
      if (file) {
        const imageUrlBase64 = await convertFileToUrl(file);
        imageUrlsBase64.push(imageUrlBase64);
      }
    }

    const updatedProduct: Product = {
      ...product,
      name: productName,
      description: productDescription,
      imageUrls: [...(product?.imageUrls || []), ...imageUrlsBase64],
      originalPrice: originalPriceValue,
      discountPrice: discountPriceValue,
      category: selectedCategory,
    };

    try {
      // Usar la ruta dinámica con el ID del producto
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        console.log('Producto actualizado con éxito');
        toast({
          title: 'Producto actualizado',
          description: `El producto ${productName} se ha actualizado correctamente.`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Actualizar la lista de productos en el estado
        const updatedProducts = products.map((p) =>
          p.id === product.id ? updatedProduct : p
        );
        setProducts(updatedProducts);
      } else {
        console.error('Error al actualizar el producto:', response.status);
        toast({
          title: 'Error al actualizar producto',
          description: 'Ha ocurrido un error al actualizar el producto.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      toast({
        title: 'Error al actualizar producto',
        description: 'Ha ocurrido un error al actualizar el producto.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleProductChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProduct(event.target.value);
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} p={4} borderRadius="lg" mt={90}>
      <Stack spacing={4}>
        <Heading fontSize="xl" mb={4}>
          Editar Producto
        </Heading>

        {/* Dropdown para seleccionar producto */}
        <FormControl isRequired>
          <FormLabel htmlFor="selectProduct">Seleccionar Producto:</FormLabel>
          <Select
            id="selectProduct"
            placeholder="Seleccionar producto"
            value={selectedProduct}
            onChange={handleProductChange}
          >
            {products.map((product) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </Select>
        </FormControl>

        {/* Formulario de edición (visible si se selecciona un producto) */}
        {product && (
          <>
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
              <FormLabel htmlFor="productDescription">
                Descripción del Producto:
              </FormLabel>
              <Textarea
                id="productDescription"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Imágenes del Producto:</FormLabel>
              {/* Mostrar las imágenes actuales del producto */}
              <SimpleGrid columns={3} spacing={4}>
                {product?.imageUrls.map((imageUrl, index) => (
                  <Box key={index}>
                    <Image src={imageUrl} alt="Product Image" />
                  </Box>
                ))}
              </SimpleGrid>

              {/* Campos para agregar nuevas imágenes */}
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
                onClick={handleUpdateProduct}
              >
                Actualizar Producto
              </Button>
            </Center>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default EditProduct;