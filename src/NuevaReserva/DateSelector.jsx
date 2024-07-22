import React from 'react';
import ReactDatePicker from "react-datepicker";

const DateSelector = ({ selected, onChange, includeDates }) => {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      includeDates={includeDates}
      dateFormat="yyyy-MM-dd"
      placeholderText="Seleccionar fecha"
      required
    />
  );
};
export default DateSelector