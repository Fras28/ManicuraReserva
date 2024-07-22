import React from "react";

import Calendario from "./Calendario";

import HorariosAdmin from "./HorariosAdmin";


const Admin = () =>{

    return(
        <div style={{padding:"1rem"}}> 
            <Calendario/>
            <HorariosAdmin/>
        </div>
    )
}

export default Admin