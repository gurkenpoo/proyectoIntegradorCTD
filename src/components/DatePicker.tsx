import React, { useState, useEffect } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./styles/datepicker.css";
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

const DatePicker: React.FC<{ productId: number; product: any }> = ({
  productId,
  product,
}) => {
  const [values, setValues] = useState<DateObject[][]>([]);
  const [selectedDatesToReserve, setSelectedDatesToReserve] = useState<
    string[]
  >([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [reservedDates, setReservedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await fetch(`/api/reserves/${productId}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Respuesta de la API:", data);

          const productReservedDates = data
            .filter((reserve: any) => reserve.product.id === productId)
            .flatMap((reserve: any) => reserve.reservedDates);

          console.log("Fechas reservadas:", productReservedDates);

          setReservedDates(productReservedDates);
        } else {
          console.error(
            "Error al obtener las reservas:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservedDates();
  }, [productId]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await fetch("/api/auth/validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setIsAuthenticated(true);
            setUserId(data.userId);
            setUserName(data.userName);
          } else {
            setIsAuthenticated(false);
            setUserId(null);
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error al verificar la autenticación:", error);
          setIsAuthenticated(false);
          setUserId(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserId(null);
      }
    };

    checkAuthentication();
  }, []);

  const isReserved = (strDate: string) => {
    console.log("Fecha actual:", strDate);
    console.log("Fechas reservadas:", reservedDates);
    return reservedDates.includes(strDate);
  };

  const handleDateChange = (ranges: DateObject[][]) => {
    let allSelectedDates: string[] = [];

    for (const [rangeStart, rangeEnd] of ranges) {
      let date = new DateObject(rangeStart);
      while (date <= new DateObject(rangeEnd)) {
        const formattedDate = date.format("YYYY-MM-DD");

        allSelectedDates.push(formattedDate);

        if (isReserved(formattedDate)) {
          setErrorMessage(
            "No se pueden seleccionar rangos que incluyan fechas reservadas"
          );
          return;
        }
        date = date.add(1, "days");
      }
    }

    setErrorMessage(null);
    setValues(ranges.slice(0, 1));

    setSelectedDatesToReserve(allSelectedDates);
  };

  const handleReserve = async () => {
    try {
      const response = await fetch("/api/reserves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: { id: productId },
          user: { id: userId }, // Usar el ID del usuario autenticado
          reservedDates: selectedDatesToReserve,
        }),
      });

      if (response.ok) {
        toast({
          title: "Reserva creada correctamente",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error al crear la reserva",
          description: response.statusText,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      toast({
        title: "Error al crear la reserva",
        description: "Hubo un error al procesar tu solicitud.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const resetDates = () => {
    setValues([]);
    setSelectedDatesToReserve([]);
    setErrorMessage(null);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Box position="relative" padding="10">
        <Divider />
        <AbsoluteCenter bg="white" px="4" as="b">
          Reservar Tour
        </AbsoluteCenter>
      </Box>
      <Text as="i">Selecciona el rango de fecha para tu reserva</Text>

      <div style={{ margin: "10px", display: "flex", gap: "10px" }}>
        <div className="un-availble">
          <div className="reserved" />
          <p>Reservado</p>
        </div>
      </div>

      {loading && <div>Cargando fechas reservadas...</div>}

      <Calendar
        minDate={new Date()}
        numberOfMonths={2}
        disableMonthPicker
        disableYearPicker
        multiple
        range
        value={values}
        onChange={handleDateChange}
        mapDays={({ date }) => {
          const strDate = date.format("YYYY-MM-DD");
          if (isReserved(strDate)) {
            return {
              disabled: true,
              className: "reserved",
            };
          }
          return {};
        }}
      />

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <Button
        colorScheme="cyan"
        rightIcon={<RepeatClockIcon />}
        variant="outline"
        onClick={resetDates}
      >
        Actualizar Calendario
      </Button>

      {/* Mostrar el botón solo si está autenticado */}
      {isAuthenticated && (
        <Button
          onClick={onOpen}
          isDisabled={selectedDatesToReserve.length === 0}
          mt={4}
        >
          Seleccionar fechas
        </Button>
      )}

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Confirmar Reserva</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Mostrar detalles del producto */}
            <Text fontWeight="bold">Producto:</Text>
            <Text>{product.name}</Text>

            {/* Mostrar fechas seleccionadas */}
            <Text fontWeight="bold" mt={4}>
              Fechas seleccionadas:
            </Text>
            {selectedDatesToReserve.map((date, index) => (
              <Text key={index}>{date}</Text>
            ))}

            {/* Mostrar información del usuario */}
            {userId && (
              <>
                <Text fontWeight="bold" mt={4}>
                  Usuario:
                </Text>
                <Text>ID: {userId}</Text>
                {userName && <Text>Nombre: {userName}</Text>}
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="ghost" onClick={() => {
              handleReserve();
              onClose(); // Cerrar el modal después de realizar la reserva
            }}>
              Realizar Reserva
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div>
        {values.map((range, index) => (
          <div key={index}>
            Fecha seleccionada: {range[0]?.format()} - {range[1]?.format()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;