import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";

const Prestadores = () => {
  const prestadores = useSelector((state) => state.reservas.prestadores);

  return (
    <div className="bgPrestador triangle">
      <div
     
        className="cont-Cards"
      >
        {prestadores?.map((prestador) => (
          <Card
            key={prestador.id} // Asegúrate de usar una key única para cada Card en el array
            nombrePrestador={prestador.attributes.nombre} // Ajusta según la estructura de tus datos
            perfilImg={prestador.attributes.avatar.data.attributes.url} // Ajusta según la estructura de tus datos
            fondo={prestador.attributes.fondoPerfil.data.attributes.url} // Ajusta según la estructura de tus datos
            servicio={prestador.attributes.Servicio} // Ajusta según la estructura de tus datos
            id={prestador.id}
       
          />
        ))}
      </div>
    </div>
  );
};

export default Prestadores;
