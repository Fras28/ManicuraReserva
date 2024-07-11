import React, { useState } from 'react';
import Peluq from "./assets/Peluq.jpeg";
import NuevaReserva from './NuevaReserva'; // Importa el componente de NuevaReserva aquí

const Card = ({ nombrePrestador, perfilImg, fondo, servicio,id }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }
console.log(id);
  return (
    <div className="card" >
      <div className="card__img">
        <img src={`http://localhost:1337${fondo}`}  alt="Card Image" />
      </div>
      <div className="card__avatar">
        {/* Aquí va la segunda imagen */}
        <img src={`http://localhost:1337${perfilImg}`} alt="Avatar" />
      </div>
      <div className="card__title">{nombrePrestador}</div>
      <div className="card__subtitle">{servicio?.length > 3 ? servicio : "peluquero unisex"}</div>
      <div className="card__wrapper">
        <button className="card__btn" onClick={openModal}>Reservar</button>
      </div>

      {/* Modal para NuevaReserva */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <NuevaReserva prestador={{id, nombrePrestador}}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
