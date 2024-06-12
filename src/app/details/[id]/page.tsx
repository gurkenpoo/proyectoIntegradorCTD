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
  Button,
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
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Header from '@/components/Header';
import DatePicker from '@/components/DatePicker'; 

interface Product {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  imageUrls: string[];
  category: string;
  description: string;
}

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
            <DatePicker/>

            <Button
              rounded={'15'}
              w={'full'}
              mt={8}
              size={'lg'}
              py={'7'}
              bg={useColorModeValue('gray.900', 'gray.50')}
              color={useColorModeValue('white', 'gray.900')}
              textTransform={'uppercase'}
              _hover={{
                transform: 'translateY(2px)',
                boxShadow: 'lg',
              }}>
              Reservar ahora
            </Button>

            <Stack direction="row" alignItems="center" justifyContent={'center'}>
              <MdLocalShipping />
              <Text> El correo de confirmacion llegara en unos minutos</Text>
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