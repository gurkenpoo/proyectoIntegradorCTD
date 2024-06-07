'use client';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Select,
  useToast,
  Button,
  Skeleton,
  FormControl,
  FormLabel,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { UserInt } from '@/interfaces/UserInt';
import { CloseIcon } from '@chakra-ui/icons';

const EditUser: React.FC = () => {
  const toast = useToast();
  const [users, setUsers] = useState<UserInt[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInt | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data: UserInt[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      } finally {
        setLoadingUsers(false); 
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = parseInt(event.target.value, 10);
    const foundUser = users.find(user => user.id === selectedUserId);
    setSelectedUser(foundUser || null);
  };

  const handleGrantAdminRole = async () => {
    if (!selectedUser) {
      toast({
        title: 'Error',
        description: 'Selecciona un usuario primero',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tipo: 'admin' }),
      });

      if (response.ok) {
        toast({
          title: 'Rol Actualizado',
          description: `Se ha otorgado el rol de administrador a ${selectedUser.nombre} ${selectedUser.apellido}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        const updatedUsers = users.map(user =>
          user.id === selectedUser.id ? { ...user, tipo: 'admin' } : user
        );
        setUsers(updatedUsers);
        setSelectedUser(null);
      } else {
        console.error('Error al actualizar el rol del usuario:', response.status);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el rol del usuario',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el rol del usuario',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRevokeAdminRole = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tipo: 'usuario' }),
      });

      if (response.ok) {
        toast({
          title: 'Rol Actualizado',
          description: 'Se ha revocado el rol de administrador',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        const updatedUsers = users.map(user =>
          user.id === userId ? { ...user, tipo: 'usuario' } : user
        );
        setUsers(updatedUsers);
      } else {
        console.error('Error al actualizar el rol del usuario:', response.status);
        toast({
          title: 'Error',
          description: 'No se pudo actualizar el rol del usuario',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error en la solicitud fetch:', error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el rol del usuario',
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
        <Heading fontSize="xl" mb={4}>
          Editar Usuarios
        </Heading>
        {loadingUsers ? (
          <Center>
            <Skeleton height="200px" width="80%" my="20px" />
          </Center>
        ) : (
          <>
            <FormControl isRequired>
              <FormLabel htmlFor="selectUser">Seleccionar Usuario:</FormLabel>
              <Select id="selectUser" placeholder="Seleccionar usuario" value={selectedUser?.id || ''} onChange={handleUserChange}>
                {users
                  .filter(user => user.tipo === 'usuario')
                  .map(user => (
                    <option key={user.id} value={user.id}>
                      {user.nombre} {user.apellido}
                    </option>
                  ))}
              </Select>
            </FormControl>
            {selectedUser && (
              <Center>
                <Button colorScheme="teal" onClick={handleGrantAdminRole}>
                  Dar Rol de Administrador
                </Button>
              </Center>
            )}
            <Heading fontSize="lg" mt={8}>
              Usuarios Administradores
            </Heading>
            <Stack spacing={2}>
              {users
                .filter(user => user.tipo === 'admin')
                .map(user => (
                  <Flex key={user.id} alignItems="center" justifyContent="space-between" p={2} borderWidth="1px" borderRadius="md">
                    <Text>
                      {user.nombre} {user.apellido}
                    </Text>
                    <IconButton
                      aria-label="Revocar Rol Admin"
                      icon={<CloseIcon />}
                      onClick={() => handleRevokeAdminRole(user.id)}
                      colorScheme="red"
                      size="sm"
                    />
                  </Flex>
                ))}
            </Stack>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default EditUser;