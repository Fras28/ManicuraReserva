import React from 'react';

const PrestadorSelector = ({ value, onChange, prestadores }) => {
  return (
    <select
      name="prestador"
      value={value}
      onChange={onChange}
      required
    >
      <option value="">Seleccionar prestador</option>
      {prestadores.map((prestador) => (
        <option key={prestador.id} value={prestador.id}>
          {prestador.attributes.nombre}
        </option>
      ))}
    </select>
  );
};
export default PrestadorSelector