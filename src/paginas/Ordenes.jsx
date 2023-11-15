import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

export const Ordenes = () => {
  const { sesion } = useAuthContext();
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/orden/`)
      .then((res) => res.json())
      .then((orden) => setOrdenes(orden));
  }, []);

  return (
    <>
      <h1>Ordenes</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scoope="col">Id Mesa</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <th scope="row">{orden.id}</th>

              <td>{orden.fecha}</td>
              <td>{orden.estado}</td>
              <td>{orden.id_mesa}</td>
              <td>
                <div>
                  <button>Eliminar</button>
                  <button>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
