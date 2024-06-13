// components/DatePicker.tsx
import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./styles/datepicker.css";
import { AbsoluteCenter, Box, Button, Divider, Text } from "@chakra-ui/react";
import { RepeatClockIcon } from "@chakra-ui/icons";

let reserved: any[] = [
  
];

function agregarReservas(){
  reserved = [[new DateObject().setDay(25).format(), new DateObject().setDay(26).format()],
  [new DateObject().setDay(29).format(), new DateObject().setDay(30).format()],
  [new DateObject().setDay(17).format(), new DateObject().setDay(18).format()]] 
}

setTimeout(agregarReservas, 8000)

const inService: any[] = [
  // [new DateObject().setDay(21).format(), new DateObject().setDay(22).format()],
  // [new DateObject().setDay(27).format(), new DateObject().setDay(27).format()],
];

const DatePicker: React.FC = () => {
  const [values, setValues] = useState<DateObject[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [obtenerReserva, setObtenerReserva] = useState(true)

  const isReserved = (strDate: string) => {
    return reserved.some(([start, end]) => strDate >= start && strDate <= end);
  };

  const isInService = (strDate: string) => {
    return inService.some(([start, end]) => strDate >= start && strDate <= end);
  };

  const handleDateChange = (ranges: DateObject[][]) => {
    for (const [rangeStart, rangeEnd] of ranges) {
      let date = new DateObject(rangeStart);
      while (date <= new DateObject(rangeEnd)) {
        const formattedDate = date.format();
        if (isReserved(formattedDate) || isInService(formattedDate)) {
          setErrorMessage("No se pueden seleccionar rangos que incluyan fechas reservadas");
          return;
        }
        date = date.add(1, "days");
      }
    }
    setErrorMessage(null);
    setValues(ranges.slice(0, 1)); // Asegura que solo haya un rango seleccionado
  };

  const resetDates = () => {
    setValues([]);
    setErrorMessage(null);
    setObtenerReserva(false);
  };

  return (
    <div>
      <Box position='relative' padding='10'>
  <Divider />
  <AbsoluteCenter bg='white' px='4' as="b">
    Reservar Tour
  </AbsoluteCenter>
</Box>
      <Text as='i'>Selecciona el rango de fecha para tu reserva</Text>

      <div style={{ margin: "10px", display: 'flex', gap: '10px' }}>
        <div className="un-availble">
          <div className="reserved" />
          <p>Reservado</p>
        </div>
      </div>

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
          const strDate = date.format();
          if (isReserved(strDate) || isInService(strDate)) {
            return {
              disabled: true,
            };
          }
          return {};
        }}
      />
      {obtenerReserva && <div className="error-message">No se pudo obtener las fechas correctamente, haz click en 'Actualizar Calendario'</div>}

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <Button colorScheme='cyan' rightIcon={<RepeatClockIcon />} variant='outline' onClick={resetDates}>Actualizar Calendario</Button>

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
