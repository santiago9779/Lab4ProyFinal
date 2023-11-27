import { useState, useEffect, useRef } from "react";
import {Mesas} from "./Mesas.jsx"
import {Menu} from "/src/paginas/Menu.jsx";
import {Ordenes} from "./Ordenes.jsx";
import { useReactToPrint } from "react-to-print";

export function Restaurante() {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});
  const [productos, setProductos] = useState([]);
  const [producto, setProducto] = useState({});
  const [cantidad, setCantidad] = useState(1);
  const [facturaId, setFacturaId] = useState(0);
  const [items, setItems] = useState([]);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const obtenerClientes = async () => {
    const response = await fetch("http://localhost:3000/clientes");
    const data = await response.json();
    setClientes(data);
  };

  const obtenerProductos = async () => {
    const response = await fetch("http://localhost:3000/productos");
    const data = await response.json();
    setProductos(data);
  };

  const obtenerFacturaId = async (clienteId) => {
    const response = await fetch(
      `http://localhost:3000/factura?clienteId=${clienteId}`
    );
    const data = await response.json();
    setFacturaId(data);
  };

  const agregarItem = async (parametros) => {
    const response = await fetch("http://localhost:3000/detalle/agregar-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    });
    const data = await response.json();

    if (data[0]["mensaje"]) {
      if (data[0]["mensaje"].includes("duplicada")) {
        console.log(data[0]["mensaje"]);
        alert("El producto ya fue ingresado. Seleccione otro");
      } else if (data[0]["mensaje"].includes("stock")) {
        console.log(data[0]["mensaje"]);
        alert("No hay stock suficiente para esa cantidad");
      } else if (data[0]["mensaje"].includes("revirtieron")) {
        console.log(data[0]["mensaje"]);
        alert(
          "Ocurrió un error en la transacción y se revirtieron los cambios.\nPor favor comunicarse con el administrador"
        );
      }
    } else {
      setItems(data);
      obtenerProductos();
    }
  };

  const quitarItem = async (item) => {
    const parametros = {
      productoId: item.producto_id,
      facturaId: item.factura_id,
    };
    const response = await fetch("http://localhost:3000/detalle/quitar-item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parametros),
    });
    const data = await response.json();
    setItems(data);
    obtenerProductos();
  };

  useEffect(() => {
    obtenerClientes();
    obtenerProductos();
  }, []);

  const handleSubmit = () => {
    agregarItem({
      productoId: producto.id,
      facturaId: facturaId,
      cantidad: cantidad,
    });
    setCantidad(1);
  };

  const handleCliente = (cliente) => {
    obtenerFacturaId(cliente.id);
    setCliente(cliente);
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
      <h2 className="text-center">Sistema de Ventas</h2>
      <Mesas clientes={clientes} cliente={handleCliente} />
      <br />
      <h4>
        {Object.keys(cliente).length > 0
          ? `${cliente.dni}, ${cliente.apellido} ${cliente.nombre}`
          : null}
      </h4>
      <Menu productos={productos} producto={handleProducto} />
      <br />
      <h4>
        {Object.keys(producto).length > 0
          ? `${producto.nombre}, ${producto.descripcion}`
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