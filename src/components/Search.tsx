'use client'
import { Box, Flex, Input, Button, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import React from 'react';

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [destination, setDestination] = React.useState('');
  const [arrivalDate, setArrivalDate] = React.useState('');
  const [departureDate, setDepartureDate] = React.useState('');
  const [guests, setGuests] = React.useState('');
  const today = new Date().toISOString().split('T')[0];


  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para la búsqueda 
    // con los valores de 'destination', 'arrivalDate', 'departureDate' y 'guests'
  };

  return (
    <Box>
      <Button onClick={onOpen} variant="outline">
        <SearchIcon mr={2} />
        Buscar Tours
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent>
          <ModalHeader>Buscar Viajes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column">
              <Box mb={4}>
                <Text fontSize="lg">¿Dónde?</Text>
                <Input
                  placeholder="Explora destinos"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </Box>

              <Flex mb={4}>
                <Box mr={4}>
                  <Text fontSize="lg">Llegada</Text>
                  <Input
                    type="date"
                    min={today}
                    placeholder="Agrega fecha..."
                    value={arrivalDate}
                    onChange={(e) => setArrivalDate(e.target.value)}
                  />
                </Box>

                <Box>
                  <Text fontSize="lg">Salida</Text>
                  <Input
                    type="date"
                    placeholder="Agrega fecha..."
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                  />
                </Box>
              </Flex>

              <Box mb={4}>
                <Text fontSize="lg">¿Quién?</Text>
                <Input
                  type="number"
                  placeholder="¿Cuántos?"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
              Buscar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Search;