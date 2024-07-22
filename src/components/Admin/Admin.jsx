import React from "react";

import Calendario from "./Calendario";

import HorariosAdmin from "./HorariosAdmin";
import InicioButton from "../Results/InicioButton";

const Admin = () => {
  return (
    <div
      style={{
        padding: "1rem",
        gap: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InicioButton />
      <Calendario />
      <HorariosAdmin />
      <InicioButton />
    </div>
  );
};

export default Admin;
