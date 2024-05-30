'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function SignupCard() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [tipo, setTipo] = useState('usuario');

  const handleSubmit = async () => { //  No necesitas el evento aquí
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, email, contrasena, tipo }),
      });

      if (response.ok) {
        console.log('Usuario creado con éxito');
        toast({
          title: 'Usuario creado',
          description: 'Tu cuenta ha sido creada con éxito.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        
        // Limpiar los campos del formulario
        setNombre('');
        setApellido('');
        setEmail('');
        setContrasena('');
        setTipo('usuario');
      } else {
        console.error('Error al crear el usuario:', response.status);
        toast({
          title: 'Error al crear usuario',
          description: 'Hubo un error al crear tu cuenta. Inténtalo de nuevo más tarde.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      toast({
        title: 'Error al crear usuario',
        description: 'Hubo un error al crear tu cuenta. Inténtalo de nuevo más tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}> {/* Quitamos el as="form" */}
            <HStack>
              <Box>
                <FormControl id="nombre" isRequired>
                  <FormLabel>Nombre/s</FormLabel>
                  <Input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="apellido">
                  <FormLabel>Apellido/s</FormLabel>
                  <Input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>correo electronico @</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="contrasena" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'#292864'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit} // <-- onClick en el botón
              >
                Crear Cuenta
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Ya eres Usuario?{' '}
                <Link color={'blue.400'} href='/login/signIn'>
                  Iniciar Sesion
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}