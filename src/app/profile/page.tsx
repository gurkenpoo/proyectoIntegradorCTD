'use client';

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  useColorModeValue,
  Avatar,
  Center,
  Link,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { UserInt } from '@/interfaces/UserInt';
import { useRouter } from 'next/navigation';  // Importa useRouter
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function UserProfileEdit() {
  const [user, setUser] = useState<UserInt | null>(null);
  const router = useRouter();  // Inicializa useRouter

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          router.push('/login/signIn');  // Redirige al usuario si no hay token
          return;
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData: UserInt = await response.json();
          console.log('User data:', userData);
          setUser(userData);
        } else {
          console.error('Error fetching user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [router]);  // Asegúrate de incluir router en las dependencias

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>
        <FormControl id="userIcon">
          <FormLabel>User Icon</FormLabel>
          <Center>
            <Avatar
              name={user ? `${user.nombre} ${user.apellido}` : 'User'}
              size="xl"
            />
          </Center>
        </FormControl>
        <HStack spacing={4}>
          <FormControl id="userName" isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              placeholder="First Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={user?.nombre ?? ''}
              readOnly
            />
          </FormControl>
          <FormControl id="userSurname" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={user?.apellido ?? ''}
              readOnly
            />
          </FormControl>
        </HStack>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={user?.email ?? ''}
            readOnly
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button as={Link} href='/' leftIcon={<ArrowBackIcon />} colorScheme='pink' variant='solid'>
              Volver
            </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
