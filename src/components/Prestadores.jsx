import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import logo from "./assets/Logo.png"
import avat1 from "./assets/Avatars/avataaars (1).png"
import avat2 from "./assets/Avatars/avataaars (2).png"
import avat3 from "./assets/Avatars/avataaars.png"

const avatars = [avat1, avat2, avat3];

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
        {prestadores?.map((prestador, index) => (
          <Card
            key={prestador.id}
            prestador={prestador.attributes}
            idPrestador={prestador.id}
            avatar={avatars[index % avatars.length]} // Asigna un avatar cíclicamente
          />
        ))}
      </div>
    </div>
  );
};

export default Prestadores;