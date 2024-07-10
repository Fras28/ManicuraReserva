import React from "react";
import meat from "../assets/meat.jpg"; // Importa la imagen de meat
import pollo from "../assets/pollo.jpeg";
import cerdo from "../assets/cerdo.jpeg";
import oferta from "../assets/oferta.jpeg"
import { border } from "@chakra-ui/react";

const Categorias = () => {
  // Array de categorías con información de imagen y título
  const categorias = [
    {
      id: 1,
      titulo: "Carnes Rojas",
      imagen: meat, // Asigna la imagen de meat como fondo de la primera tarjeta
    },
    {
      id: 2,
      titulo: "Pollo",
      imagen: pollo, // Cambia por la URL de la imagen deseada
    },
    {
      id: 3,
      titulo: "Cerdo",
      imagen: cerdo, // Cambia por la URL de la imagen deseada
    },
    {
      id: 4,
      titulo: "Promos",
      imagen: oferta, // Cambia por la URL de la imagen deseada
    },
  ];

  return (
    <div style={styles.container}>
      {categorias.map((categoria, index) => (
        <div key={categoria.id} style={{ ...styles.card, backgroundImage: `url(${categoria.imagen})` }}>
          <h3 style={styles.title}>{categoria.titulo}</h3>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    width: "100vw",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
    padding: "10px",
    backgroundColor: "lightgrey",
    justifyItems: "center",
  },
  card: {
    width: "100%",
    height: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    borderRadius:"12px",
    boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
  },
  title: {
    textAlign: "center",
  },
};

export default Categorias;
