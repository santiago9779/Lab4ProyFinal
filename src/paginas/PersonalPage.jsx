import { useSearchParams } from "react-router-dom";
import { Visible } from "./RequireAuth";
import { useState } from "react";

export const PersonalPage = () => {
  const [personal, setPersonal]=useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/personal/`)
      .then((res)=>res.json())
      .then((personal)=> setPersonal(personal))
    })
 
 
    return (
    
    <>
      <p><h1>Mi perfil</h1></p>
      <Visible rol="jefe">
        <p><h2>Es admin!</h2></p>
      </Visible>
      <Visible rol="empleado">
        <p><h2>Es usuario!</h2></p>
      </Visible>
    </>
  );
};
