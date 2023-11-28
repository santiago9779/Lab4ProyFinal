import { useState, useEffect, useRef } from "react";
import {Mesas} from "/src/paginas/Mesas.jsx"
import {Menu} from "/src/paginas/Menu.jsx";
import {Ordenes} from "./Ordenes.jsx";
import { useReactToPrint } from "react-to-print";

export function Restaurante() {
  const [mesas, setMesas] = useState([]);
  const [mesa, setMesa] = useState({});
  const [menu, setMenu] = useState([]);
  const [producto, setProducto] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const [id_orden, setId_orden] = useState(0);
  const [items, setItems] = useState([]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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

  const obtenerOrdenId = async (id_mesa) => {
    const response = await fetch(
      `http://localhost:4000/orden?id_mesa=${id_mesa}`
    );
    const data = await response.json();
    setId_orden(data);
  };

  const agregarItem = async (parametros) => {
    const response = await fetch("http://localhost:4000/orden/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    });
    const data = await response.json();
      setItems(data)
  };

  const quitarItem = async (item) => {
    const parametros = {
      productoId: item.producto_id,
      id_orden: item.orden_id,
    };
    const response = await fetch("http://localhost:4000/detalle/quitar-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    });
    const data = await response.json();
    setItems(data);
    obtenerMenu();
  };

  useEffect(() => {
    obtenerMesas();
    obtenerMenu();
  }, []);

  const handleSubmit = () => {
    agregarItem({
      productoId: producto.id,
      id_orden: id_orden,
      cantidad: cantidad,
    });
    setCantidad(1);
  };

  const handleMesa = (mesa) => {
    obtenerOrdenId(mesa.id);
    setMesa(mesa);
  };

  const handleProducto = (producto) => {
    setProducto(producto);
  };

  const handleItem = (item) => {
    quitarItem(item);
  };

  const incrementa = () => {
    setCantidad(cantidad + 1);
  };

  const decrementa = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className="container">
      <Mesas mesas={mesas} mesa={handleMesa} />
      <br />
      <h4>
        {Object.keys(mesa).length > 0
          ? `Mesa: ${mesa.id}, Capacidad: ${mesa.capacidad},Ocupada ${mesa.ocupada}`
          : null}
      </h4>
      <Menu menu={menu} producto={handleProducto} />
      <br />
      <h4>
        {Object.keys(producto).length > 0
          ? `nombre: ${producto.nombre}, descripcion: ${producto.descripcion}, precio: ${producto.precio}`
          : null}
      </h4>
      <br />
      <div className="input-group container-md">
        <span className="input-group-text">Cantidad</span>
        <input type="text" value={cantidad} className="form-control" readOnly />
        <button className="btn btn-outline-secondary" onClick={incrementa}>
          +
        </button>
        <button className="btn btn-outline-secondary" onClick={decrementa}>
          -
        </button>
        <button className="btn btn-success" onClick={handleSubmit}>
          Añadir producto
        </button>
      </div>
      <br />
      <br />
      {Object.keys(items).length > 0 ? (
        <div>
          <Ordenes ref={componentRef} items={items} item={handleItem} />
          <button className="btn btn-primary float-end" onClick={handlePrint}>
            Imprimir Factura
          </button>
        </div>
      ) : null}
    </div>
  );
}