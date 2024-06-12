// components/DatePicker.tsx
import React, { useState } from "react";
import { Calendar, DateObject } from "react-multi-date-picker";
import "./styles/datepicker.css";

const reserved = [
  [new DateObject().setDay(24).format(), new DateObject().setDay(26).format()],
  [new DateObject().setDay(30).format(), new DateObject().setDay(29).format()],
];

const inService = [
  [new DateObject().setDay(21).format(), new DateObject().setDay(22).format()],
  [new DateObject().setDay(27).format(), new DateObject().setDay(27).format()],
];

const DatePicker: React.FC = () => {
  const [values, setValues] = useState<DateObject[][]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
          setErrorMessage("No se pueden seleccionar rangos que incluyan fechas reservadas o en servicio.");
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
  };

  return (
    <div>
      <h5>Reserva de Habitación</h5>
      <p>Selecciona el rango de fechas que deseas reservar:</p>

      <div style={{ margin: "10px", display: 'flex', gap: '10px' }}>
        <div className="un-availble">
          <div className="reserved" />
          <p>Reservado</p>
        </div>
      </div>

      <Calendar
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

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button onClick={resetDates}>Resetear Fechas</button>

      <div>
        {values.map((range, index) => (
          <div key={index}>
            Rango {index + 1}: {range[0]?.format()} - {range[1]?.format()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePicker;
