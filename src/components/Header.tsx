'use client'
import { Box, Button, Flex, Stack, useColorModeValue, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input } from '@chakra-ui/react';
import { Image, Link } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import { Avatar } from '@chakra-ui/react';
import { UserInt } from '@/interfaces/UserInt'; // Importa la interfaz UserInt


const Header = () => {
  const [user, setUser] = useState<UserInt | null>(null); // Usa UserInt para tipar user
  const router = useRouter(); // Inicializa useRouter
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Estado para controlar si el Drawer está abierto

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          // router.push('/login/signIn'); // Redirige al usuario si no hay token
          return;
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData: UserInt = await response.json(); // Usa UserInt para tipar userData
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
  }, [router]); // Asegúrate de incluir router en las dependencias

  // Función para abrir el Drawer
  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Función para cerrar el Drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    router.push("/login/signIn"); // Redirige al home
  };

  return (
    <>
      <Box as="header" position="fixed" top="0" w="full" zIndex={1000}>
        <Flex
          maxWidth="100vw"
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}
          justify={'space-between'}
        >
          <Flex
            w="full"
            maxW={'sm'}
            flex={{ base: 1 }}
            justify={{ base: 'center', md: 'start' }}
          >
            <Box>
              <Link href={'/'}>
                <Image src="/logoVino.png" width={160} height={140} alt="logo" />
              </Link>
            </Box>
            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              {/* <DesktopNav /> */}
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {user ? (
              // Avatar que abre el Drawer al hacer clic
              <Box onClick={handleOpenDrawer} cursor="pointer">
                <AvatarWithInitials user={user} />
              </Box>
            ) : (
              <>
                <Button as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'/login/signIn'}>
                  Iniciar Sesión
                </Button>
                <Button
                  as={'a'}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'#b592c3'}
                  href={'/login/signUp'}
                  _hover={{
                    bg: '#292864',
                  }}
                >
                  Crear Sesión
                </Button>
              </>
            )}

            {/* Botón de Cerrar Sesión */}
          </Stack>
        </Flex>
      </Box>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        placement='right'
        onClose={handleCloseDrawer}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>User Profile</DrawerHeader>

          <DrawerBody>
            <Input size={"sm"} placeholder='Type here...' />
            <Button mt={6} onClick={handleLogout} colorScheme='pink' variant='solid'>
                Cerrar Sesión
              </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={handleCloseDrawer}>
              Cancel
            </Button>
                          
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

interface AvatarWithInitialsProps {
  user: UserInt | null;
}

const AvatarWithInitials = ({ user }: AvatarWithInitialsProps) => {
  const initials = user ? `${user.nombre.charAt(0)}${user.apellido.charAt(0)}` : 'U';

  return (
    <Avatar name={initials} />
  );
};

export default Header;
