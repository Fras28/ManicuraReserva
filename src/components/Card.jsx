import React, { useState } from 'react';
import NuevaReserva from './NuevaReserva';
import { Button, Checkbox, Radio, RadioGroup } from '@chakra-ui/react';
import fondo from "./assets/Manicura-semipermanente.jpeg"
import { BiCalendarPlus } from 'react-icons/bi';

const API_URL = process.env.REACT_APP_API_URL;
const COMERCIO_ID = process.env.REACT_APP_COMERCIO_ID;

const Card = ({ prestador, idPrestador, avatar }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState(null);

  const name = prestador?.nombre;

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const handlePriceChange = (value) => {
    setSelectedPrice(value);
  }

  return (
    <div className="card">
      <div className="card__img">
        <img src={fondo} alt="Card Image" />
      </div>
      <div className="card__avatar">
        <img src={avatar} alt="Avatar" />
      </div>
      <div className="card__title titMai">{prestador?.nombre}</div>
      <div className="card__subtitle">{prestador?.servicio?.length > 3 ? prestador?.servicio : null}</div>
      <div className="card__prices">
      <RadioGroup onChange={handlePriceChange} value={selectedPrice}>
          {prestador?.valors.data.map(valor => (
            <div key={valor.id} style={{color:"wheat", borderBottom:"dashed 1px wheat", padding:"4px"}} className='titMai'>
              <Radio value={valor.attributes.precio}>
                <b>{valor.attributes.nombre} <br/> </b>  
                ${valor.attributes.precio} 
                {valor.attributes.tiempo && <div><b>duración:</b> {valor.attributes.tiempo}</div>}
              </Radio>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      <div className="card__wrapper" >   
        <Button  
          style={{backgroundColor:"#88B9BF", border:"solid #6E5E84 4px", borderRadius:"12px", color:"#6E5E84" }} 
          size="lg" 
          onClick={openModal} 
          isDisabled={!selectedPrice}
        >
          <BiCalendarPlus className="mr-2" size={24} /> Hacer Reserva
        </Button>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <NuevaReserva prestador={{ idPrestador, name }} precio={Number(selectedPrice)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;