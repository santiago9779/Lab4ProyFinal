import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

export const Ordenes = () => {
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
      .then((orden) => setOrdenes(orden));
  }, []);

  const agregarOrden = async () => {
    const res = await fetch("http://localhost:4000/orden/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      fecha: fecha, 
      estado: estado, 
      id_mesa: id_mesa,
      id_personal: id_personal,
      id_menu: id_menu


      }),
    });
    if (res.ok) {
      const nuevaOrden = await res.json();
      setOrdenes([...ordenes, nuevaOrden]);
      setFecha("");
      setEstado("");
      setId_mesa("");
      setId_personal("");
      setId_menu("")


      console.log("orden agregada");
    } else {
      console.log("Fallo al agregar orden");
    }
  };

  const eliminarOrden = async (id) => {
    if (window.confirm(" Desea eliminar esta orden ")) {
      const res = await fetch(`http://localhost:4000/orden/${id}`, {
        method: "DELETE",
        handers: {'Content-Type': 'application/json'}
      });
      if (res.ok) {
        setOrdenes(ordenes.filter((orden) => orden.id !== id));
        console.log("Orden eliminada");
      } else {
        console.log("No se pudo eliminar la orden");
      }
    }
  };

  const editarOrden = (orden)=>{
    setEditar(true)
    setNombre(orden.fecha)
    setDescripcion(orden.estado)
    setPrecio(orden.id_mesa)
    console.log("seleccion");
  }

  const limpiarCampos = ()=>{
    setFecha('')
    setEstado('')
    setId_mesa('')
    setEditar(false)
  }

  return (
    <>
      <h1>Ordenes</h1>
      <form className="text-center" action="">
          <input
          className="m-2"
            type="text"
            placeholder="fecha"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="text"
            placeholder="estado"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="number"
            placeholder="id mesa"
            value={id_mesa}
            onChange={(e) => {
              setId_mesa(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="number"
            placeholder="id personal"
            value={id_personal}
            onChange={(e) => {
              setId_personal(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="number"
            placeholder="id menu"
            value={id_menu}
            onChange={(e) => {
              setId_menu(e.target.value);
            }}
          />
          <div>
            {editar ? 
              <div>
                <button  className="btn btn-warning m-2">Actualizar</button>
                <button type="submit" className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
              </div>
              :
              <button type="submit" className="btn btn-primary m-2" onClick={agregarOrden}>Agregar
              </button>
              
            }
          </div>
        </form>

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
            <th scoope="col">Descripcion</th>
            <th scoope="col">Precio</th>
            <th scoope="col">Acciones</th>






            
          </tr>
        </thead>
        <tbody>
          {ordenes.map((orden) => (
            <tr key={orden.id}>
              <th scope="row">{orden.id}</th>

              <td>{orden.fecha}</td>
              <td>{orden.estado}</td>
              <td>{orden.id_mesa}</td>
              <td>{orden.id_personal}</td>
              <td>{orden.id_menu}</td>
              <td>{orden.nombre}</td>
              <td>{orden.descripcion}</td>
              <td>{orden.precio}</td>




              <td>
                <div>
                  <button onClick={ ()=>{eliminarOrden(orden.id)}} className="m-2 btn btn-danger">Eliminar</button>
                  <button className="m-2 btn btn-info" onClick={editarOrden}>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
