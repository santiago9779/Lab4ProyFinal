import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios  from "axios";

export const Ordenes = () => {
  const { sesion } = useAuthContext();
  const [ordenes, setOrdenes] = useState([]);
  const [fecha, setFecha]=useState("")
  const [estado, setEstado]=useState("")
  const [id_mesa,setId_mesa]=useState("")
  const [editar, setEditar]=useState(false)
  const [nombre, setNombre]=useState("")
  const [descripcion, setDescripcion]=useState("")
  const [precio, setPrecio]=useState("")

  useEffect(() => {
    fetch(`http://localhost:4000/orden/`)
      .then((res) => res.json())
      .then((orden) => setOrdenes(orden));
  }, []);

  const agregarOrden = async () => {
    const orden = { fecha:fecha, estado:estado, id_mesa: id_mesa };
    const response = await axios.post('https://localhost:4000/orden', orden);
    this.setOrdenes({ ordenes: response.orden });
  }

  const eliminarOrden = async (id) => {
    if (window.confirm(" Desea eliminar esta orden ")) {
      const res = await fetch(`http://localhost:4000/orden/${id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
      });
      if (res.ok) {
        setOrdenes(ordenes.filter((orden) => orden.id !== id));
        console.log("Orden eliminada");
      } else {
        console.log("No se pudo eliminar la orden");
      }
    }
  };

  const editarOrden = (orden) => {
    setEditar(true)

    setFecha(orden.fecha)
    setEstado(orden.estado)
    setId_mesa(orden.id_mesa)
  }

  const limpiarCampos = ()=>{
    setFecha('')
    setEstado('')
    setId_mesa('')
    setEditar(false)  
  }

  const actualizarOrden = async (id) => {
    const ordenUpdate= {
      fecha: setFecha(),
      estado: setEstado(),
      id_mesa: setId_mesa()
    }
    const response = await axios.put(`http://localhost:4000/orden/${id}`, {ordenUpdate});
    this.setOrdenes({updateAt: response.data.updateAt})
  }
  /*async componentDidMount() {
    // PUT request using axios with async/await
    const article = { title: 'React Put Request Example' };
    const response = await axios.put('https://reqres.in/api/articles/1', article);
    this.setState({ updatedAt: response.data.updatedAt });
}*/

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
            type="text"
            placeholder="nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="text"
            placeholder="descripcion"
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="text"
            placeholder="precio"
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value);
            }}
          />
          <div>
            {editar ? 
              <div>
                <button  className="btn btn-warning m-2" onClick={actualizarOrden}>Actualizar</button>
                <button type="button" className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
              </div>
              :
              <button type="button" className="btn btn-primary m-2" onClick={agregarOrden}>Agregar
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
            <th scoope="col">Nombre</th>
            <th scoope="col">Descripcion</th>
            <th scoope="col">Precio</th>
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
              <td>{orden.id_personal}</td>
              <td>{orden.id_menu}</td>
              <td>{orden.nombre}</td>
              <td>{orden.descripcion}</td>
              <td>{orden.precio}</td>
              <td>
                <div>
                  <button  className="m-2 btn btn-danger" onClick={()=>{eliminarOrden(orden.id)}}>Eliminar</button>
                  <button className="m-2 btn btn-info" onClick={()=>{editarOrden(orden)}}>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}