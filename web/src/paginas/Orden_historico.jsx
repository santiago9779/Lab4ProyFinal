import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

const Orden_historico = () => {
  const { sesion } = useAuthContext();

  const [ordenes, setOrdenes] = useState([]);
  const [fecha, setFecha]=useState("")
  const [estado, setEstado]=useState("")
  const [id_mesa,setId_mesa]=useState("")
  const [id_personal,setId_personal]=useState("")
  const [id_menu,setId_menu]=useState("")


  const [editar, setEditar]=useState(false)
  

  useEffect(() => {
    fetch(`http://localhost:4000/orden/`)
      .then((res) => res.json())
      .then((orden_historico) => setOrdenes(orden_historico));
  }, []);
  


  return (
    <>
      <h1>orden_historico</h1>
      

      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scoope="col">Id Mesa</th>
            <th scoope="col">Id Personal</th>
            <th scoope="col">Id Menu</th>
            <th scoope="col">Nombre</th>



            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Orden_historico.map((orden_historico) => (
            <tr key={orden_historico.id}>
              <th scope="row">{orden_historico.id}</th>

              <td>{orden_historico.fecha}</td>



            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
};
