import React from 'react';

const WhatsAppButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: ".5rem",
        backgroundColor: "#25D366",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "center",
        border: "solid 2px #253E8B",
      }}
    >
      Confirmar por WhatsApp
    </button>
  );
};

export default WhatsAppButton