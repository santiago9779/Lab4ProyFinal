import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

const Mesas = () => {
  const { sesion } = useAuthContext();
  const [mesas, setMesas] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/mesas/`)
        .then((res)=>res.json())
        .then((mesas)=> setMesas(mesas))
    },[]);
  return (
    <>
      <h1>Mesas</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">capacidad</th>
            <th scope="col">ocupada</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id}>
              <th scope="row">{mesa.id}</th>

              <td>{mesa.capacidad}</td>
              <td>{mesa.ocupada}</td>
              <td>
                <div>
                  <button className="m-2 btn btn-danger" onClick={() => {}}>
                    Eliminar
                  </button>
                  <button className="m-2 btn btn-info" onClick={() => {}}>
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Mesas;
