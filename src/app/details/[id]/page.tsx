'use client';

import { useEffect, useState } from 'react';
import { MdLocalShipping } from 'react-icons/md';
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  SkeletonText,
  Center,
  Link,
  Skeleton,
  Button,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Header from '@/components/Header';
import DatePicker from '@/components/DatePicker'; 
import { Product } from '@/app/admin/types';

function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data: Product[] = await response.json();
        setProducts(data);
        const foundProduct = data.find(p => p.id === parseInt(id, 10));
        setProduct(foundProduct || null);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  // Función para manejar el envío de la reserva
  const handleReserve = async (reservedDates: string[]) => {
    if (product) {
      try {
        const response = await fetch("/api/reserves", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product: { id: product.id },
            user: { id: 1 }, // Reemplaza con el ID del usuario actual
            reservedDates: reservedDates,
          }),
        });

        if (response.ok) {
          console.log("Reserva creada correctamente");
        } else {
          console.error(
            "Error al crear la reserva:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al crear la reserva:", error);
      }
    } else {
      console.error("Error: El producto no está definido."); 
    }
  };

  if (loading) {
    return (
      <Container maxW={'7xl'}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
          <Flex>
            <Box
              rounded={'md'}
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow={'2xl'}
              p={6}
              textAlign={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}>
              <Skeleton size="10" height={['230px', '230px', '430px']} width={['282px', '282px', '482px']} mx="auto" mb="4" />
            </Box>
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <SkeletonText noOfLines={1} spacing="4" skeletonHeight="1" w={{ base: '100%', sm: '600px' }} mx="auto" />
              <SkeletonText noOfLines={1} spacing="4" skeletonHeight="1" w={{ base: '100%', sm: '600px' }} mx="auto" />
              <SkeletonText noOfLines={1} spacing="4" skeletonHeight="1" w={{ base: '100%', sm: '600px' }} mx="auto" />
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
              }>
              <Box>
                <SkeletonText noOfLines={4} spacing="4" skeletonHeight="2" w={{ base: '100%', sm: '600px' }} mx="auto" textAlign="justify" />
              </Box>
              <Box>
                <SkeletonText noOfLines={3} spacing="4" skeletonHeight="1" w={{ base: '100%', sm: '600px' }} mx="auto" />
              </Box>
            </Stack>

            <Box mx="auto" mt={8} w={{ base: '100%', sm: '400px', lg: '500px' }}>
              <SkeletonText noOfLines={1} spacing="4" skeletonHeight="1" w={'full'} />
            </Box>

            <Stack direction='row' spacing={4} justifyContent={'center'}>
              <SkeletonText noOfLines={1} spacing="4" skeletonHeight="1" w={'full'} />
              <SkeletonText noOfLines={1} spacing="4" skeletonHeight="1" w={'full'} />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    );
  }

  if (!product) {
    return (
      <Center py={12}>
        <Text>Producto no encontrado</Text>
      </Center>
    );
  }

  return (
    <>
      <Header />
      <Container maxW={'7xl'} mt={120}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 18, md: 24 }}>
          <Stack spacing={4}>
            {product.imageUrls.map((imageUrl, index) => (
              <Image
                key={index}
                rounded={'md'}
                alt={'product image'}
                src={imageUrl}
                fit={'cover'}
                align={'center'}
                w={'100%'}
                h={{ base: '100%', sm: '400px', lg: '500px' }}
              />
            ))}
          </Stack>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                {product.name}
              </Heading>
              <Text color={useColorModeValue('gray.900', 'gray.400')} fontWeight={300} fontSize={'2xl'}>
                ${product.originalPrice}
              </Text>
              {product.discountPrice > 0 && (
                <Text textDecoration={'line-through'} color={'gray.600'} fontWeight={300} fontSize={'2xl'}>
                  ${product.discountPrice}
                </Text>
              )}
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={<StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />}>
              <VStack spacing={{ base: 4, sm: 1 }}>
                <Text
                  maxW={{ base: '100%', sm: '600px' }}
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={{ base: 'xl', sm: 'xl', md: 'xl', lg: '2xl' }}
                  fontWeight={'300'}
                  textAlign={{ base: 'left', sm: 'justify' }}>
                  {product.description}
                </Text>
              </VStack>
              <Box>
                <Text fontSize={{ base: '16px', lg: '18px' }} color={useColorModeValue('yellow.500', 'yellow.300')} fontWeight={'500'} textTransform={'uppercase'} mb={'4'}>
                  Product Details
                </Text>
                <List spacing={2}>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Category:
                    </Text>{' '}
                    {product.category}
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Original Price:
                    </Text>{' '}
                    ${product.originalPrice}
                  </ListItem>
                  {product.discountPrice > 0 && (
                    <ListItem>
                      <Text as={'span'} fontWeight={'bold'}>
                        Discount Price:
                      </Text>{' '}
                      ${product.discountPrice}
                    </ListItem>
                  )}
                </List>
              </Box>
            </Stack>
            {product && <DatePicker productId={product.id} />} 

            {/* Se eliminó el botón "Reservar ahora" */}

            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text> El correo de confirmación llegará en unos minutos</Text>
              <MdLocalShipping />
            </Stack>
            <Stack direction='row' spacing={4} justifyContent={'center'}>
              <Button as={Link} href='/#ListaProductos' leftIcon={<ArrowBackIcon />} colorScheme='pink' variant='solid'>
                Volver
              </Button>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Page;