import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import ProductViewer from '../details/components/ProductDetails'; // Ajusta la ruta según tu estructura de proyecto
import { Box, Text } from '@chakra-ui/react';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrls: string[];
  originalPrice: number;
  discountPrice: number;
  category: string;
}

interface ProductPageProps {
  product: Product | null;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <Box>
      <ProductViewer product={product} />
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const res = await fetch('URL_API_PRODUCTS'); // Reemplaza con la URL de tu API
    const products: Product[] = await res.json();

    const paths = products.map(product => ({
      params: { id: product.id.toString() },
    }));

    return { paths, fallback: true };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { paths: [], fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`URL_API_PRODUCTS/${id}`); // Reemplaza con la URL de tu API
    const product = await res.json();

    if (!product) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
};

export default ProductPage;
