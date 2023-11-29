import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios"

export function Restaurante() {
  const [mesas, setMesas] = useState([]);
  const [menu, setMenu] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [items, setItems] = useState([]);
  const [nuevoItem, setNuevoItem]=useState({})
  const [idmenu,setIdmenu]=useState()
  const [idmesa, setIdmesa]=useState()
  useEffect(() => {
    fetch(`http://localhost:4000/orden/`)
      .then((res) => res.json())
      .then((orden) => setOrdenes(orden));
  }, []);

  const componentRef = useRef();

  const obtenerMesas = async () => {
    const response = await fetch("http://localhost:4000/mesas");
    const data = await response.json();
    setMesas(data);
  };

  const obtenerMenu = async () => {
    const response = await fetch("http://localhost:4000/menu");
    const data = await response.json();
    setMenu(data);
  };
  /*  const agregarTarea = async () => {
    const res = await fetch("http://localhost:3000/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tarea: { descripcion: descripcionTarea, lista: false },
      }),
    }); */
  const agregarOrden = async () => {
    const res= await fetch("http://localhost:4000/orden",{
      method:"POST",
      headers:{"Content-Type" : "applicatin/json"},
      body:JSON.stringify({
        orden:{
          idmesa:idmesa,
          idmenu:idmenu
        }
      })
    });
    if (res.ok) {
      const ordenNueva = await res.json();
      setOrdenes([...ordenes, ordenNueva]);
      setIdmenu("");
      setIdmesa("");
    } else {
      console.log("Fallo al crear orden");
    }
  };
  
  /*const obtenerOrdenes = async () => {
    const response = await fetch(`http://localhost:4000/`);
    const data = await response.json();
    setOrdenes(data);
  };*/

  useEffect(() => {
    obtenerMesas();
    obtenerMenu();
    //obtenerOrdenes();
  }, []);

  return (
    <div className="container">
      <h4>Mesas</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">capacidad</th>
            <th scope="col">ocupada</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mes) => (
            <tr key={mes.id} onClick={()=>{
              setIdmesa(mes.id)
            }}>
              <th scope="row">{mes.id}</th>
              <td>{mes.capacidad}</td>
              <td>{mes.ocupada}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Menu</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((men) => (
            <tr key={men.id} onClick={()=>{
              setIdmenu(men.id)
            }}>
              <th scope="row">{men.id}</th>
              <td>{men.nombre }</td>
              <td>{men.descripcion}</td>
              <td>{men.precio}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <input value={idmesa} placeholder="mesa" type="number" />
      <input value={idmenu} placeholder="id menu" type="number" />
      <button onClick={()=>{agregarOrden}}>agregar a orden</button>
      </div>
      <h4>Ordenes</h4>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scoope="col">Id Mesa</th>
            <th scoope="col">Id menu</th>
            <th scoope="col">Nombre</th>
            <th scoope="col">Descripcion</th>
            <th scoope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenes.map((ord) => (
            <tr key={ord.id}>
              <th scope="row">{ord.id}</th>
              <td>{ord.fecha}</td>
              <td>{ord.estado}</td>
              <td>{ord.id_mesa}</td>
              <td>{ord.id_menu}</td>
              <td>{ord.nombre}</td>
              <td>{ord.descripcion}</td>
              <td>{ord.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
