import { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios"

export function Restaurante() {
  const [mesas, setMesas] = useState([]);
  const [menu, setMenu] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [idmenu,setIdmenu]=useState(0)
  const [idmesa, setIdmesa]=useState(0)

  const componentRef = useRef();

  const obtenerMesas = async () => {
    const response = await fetch("http://localhost:4000/restaurante/mesas");
    const data = await response.json();
    setMesas(data);
  };
  const obtenerMenu = async () => {
    const response = await fetch(`http://localhost:4000/restaurante/menu`);
    const data = await response.json();
    setMenu(data);
  };
  const obtenerOrdenes = async () => {
    const response = await fetch(`http://localhost:4000/restaurante/orden`);
    const data = await response.json();
    setOrdenes(data);
  };
  
  /* export default function App() {
  const url = "www.somewebsite.com";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Irakli Tchigladze" })
  };
  useEffect(() => {
    const getData = async () => {
       try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } catch (e) {
        return e;
    }
    }
    getData()
  }, []);
  return <div className="App"></div>;
  } */

  const agregarOrden = async (event) => {
    event.preventDefault()
    const res= await fetch("http://localhost:4000/restaurante/orden/",{
      method:"POST",
      headers:{"Content-Type" : "application/json"},
      body:JSON.stringify({
        id_mesa:idmesa,
        id_menu:idmenu
        })
    });
    if (res.ok) {
      const ordenNueva = await res.json();
      setOrdenes([...ordenes, ordenNueva]);
      setIdmenu(0);
      setIdmesa(0);
      console.log("orden agregada");
      obtenerOrdenes()
    } else {
      console.log("Fallo al crear orden");
    }
  };

  useEffect(()=>{
    obtenerMenu()
    obtenerMesas()
    obtenerOrdenes()
  },[])

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
        <form action="">
      <input 
        value={idmesa}
        onChange={(e) => {
          setIdmesa(e.target.value)}}
        placeholder="mesa"
        type="number" />
      <input
        value={idmenu}
        onChange={(e) => {
          setIdmesa(e.target.value)}}
        placeholder="id menu"
        type="number" />
      <button type="submit" onClick={(e)=>{agregarOrden(e)}}>agregar a orden</button>
      </form>
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
