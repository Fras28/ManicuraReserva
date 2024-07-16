import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import logo from "./assets/VARIANTE-1.png"


const Prestadores = () => {
  const prestadores = useSelector((state) => state.reservas.prestadores);

  return (
    <div className="bgPrestador">
      {/* Círculo 1 */}
      <div className="circle circle-1 "><img src={logo} alt="" /></div>
      {/* Círculo 2 */}
      <div className="circle circle-2 "><img src={logo} alt="" /></div>
      {/* Círculo 3 */}
      <div className="circle circle-3 "><img src={logo} alt="" /></div>

      <div className="cont-Cards">
        {prestadores?.map((prestador) => (
          <Card
            key={prestador.id} // Asegúrate de usar una key única para cada Card en el array
            prestador={prestador.attributes}
            idPrestador={prestador.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Prestadores;
