import React from 'react';
import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
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

interface ProductViewerProps {
  product: Product; // El componente ahora recibe el producto
}

const ProductViewer: React.FC<ProductViewerProps> = ({ product }) => {
  const bgColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Box bg={bgColor} p={4} borderRadius="lg">
      <Stack spacing={4}>
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
      </Stack>
    </Box>
  );
};

export default ProductViewer;
