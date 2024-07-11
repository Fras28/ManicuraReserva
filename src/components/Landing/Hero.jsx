import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-parallax';
import { Box, Button, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import { BiBasket } from 'react-icons/bi';
import bgImg from "../assets/Constelaciones.png";
import Prestadores from '../Prestadores';
import NuevaReserva from '../NuevaReserva';

const HeroSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const content = (
    <Box className='boxHero' display="flex" justifyContent="center" alignItems="center" bg="rgba(0, 0, 0, 0.5)" minH="70vh">
      <Box textAlign="center" color="white" position="relative">
        <Heading
          as="h1"
          size="2xl"
          mb="4"
          sx={{ 
            WebkitTextStroke: "2px #2e1f13",
            fontFamily: "Berkshire Swash, serif"
          }}
        >
          *
        </Heading>
        <Text fontSize="xl" mb="6">
          Servicio de la mejor calidad
        </Text>
        <Button style={{backgroundColor:"#FFBB10", border:"solid #2E1F13 4px", borderRadius:"12px"}} size="lg" leftIcon={<BiBasket />} onClick={openModal}>
          Hacer Reserva
        </Button>
        <Text fontSize="l" mb="6">
          Provincia | Direccion | Telefono 
        </Text>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile ? (
        <Box
          className='mobile-container'
          bgImage={`url(${bgImg})`}
          bgSize="cover"
          bgPos="center"
          minH="70vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {content}
        </Box>
      ) : (
        <Parallax
          bgImage={bgImg}
          strength={500}
          bgImageStyle={{
            left: '50%',
            transform: 'translate3d(-50%, -53.1804px, 0px)',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            minHeight: '28vh',
            height: 'auto',
            width: '1920px',
            filter: 'none',
          }}
          className='parallax-container'
        >
          {content}
        </Parallax>
      )}
      <Box mt={10}>
        <Prestadores />
      </Box>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <NuevaReserva />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
