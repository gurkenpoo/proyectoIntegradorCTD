'use client';
import { 
  Box, Button, Flex, Stack, useColorModeValue, 
  Drawer, DrawerBody, DrawerFooter, DrawerHeader, 
  DrawerOverlay, DrawerContent, DrawerCloseButton, Input 
} from '@chakra-ui/react';
import { Image, Link } from '@chakra-ui/next-js';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Avatar } from '@chakra-ui/react';
import { UserInt } from '@/interfaces/UserInt'; 
import { usePathname } from 'next/navigation'; 

const Header = () => {
  const [user, setUser] = useState<UserInt | null>(null);
  const router = useRouter(); 
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          if (pathname === '/admin') {
            router.push('/');
          }
          return;
        }

        const response = await fetch('/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData: UserInt = await response.json(); 
          setUser(userData);
        } else {
          console.error('Error fetching user profile:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [router, pathname]); 

  useEffect(() => {
    if (user?.tipo === 'usuario' && pathname === '/admin') {
      router.push('/');
    }
  }, [user, pathname, router]); 

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    router.push("/login/signIn"); 
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
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}
          >
            {user ? (
              <Box onClick={handleOpenDrawer} cursor="pointer">
                <Avatar name={user ? `${user.nombre} ${user.apellido}` : 'User'} size="md" /> 
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
          </Stack>
        </Flex>
      </Box>

      <Drawer 
        isOpen={isDrawerOpen}
        placement='right'
        onClose={handleCloseDrawer}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Perfil de Usuario</DrawerHeader>

          <DrawerBody>
            {/* Contenido del Drawer */}
            <Button mt={6} onClick={handleLogout} colorScheme='pink' variant='solid'>
              Cerrar Sesión
            </Button>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={handleCloseDrawer}>
              Cancelar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
