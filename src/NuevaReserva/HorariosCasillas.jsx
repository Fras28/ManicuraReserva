import React from 'react';

const HorarioCasillas = ({ availableHours, selectedHour, onChange }) => {
  return (
    <div className="horario-casillas">
      {availableHours.map((hour) => (
        <button
          key={hour}
          type="button"
          className={`horario-casilla ${selectedHour === hour ? "selected" : ""}`}
          onClick={() => onChange(hour)}
        >
          {hour}
          {selectedHour === hour && <span className="check-icon">✓</span>}
        </button>
      ))}
    </div>
  );
};

export default HorarioCasillas