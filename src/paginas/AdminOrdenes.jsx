import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

export const AdminOrdenes = () => {
  const { sesion } = useAuthContext();
  const [ordenes, setOrdenes] = useState([]);
  const [id_mesa, setId_mesa] = useState(0);
  const [idmenu, setIdmenu]=useState(0)
  const [editar, setEditar] = useState(false);

  const obtenerOrdenes= async()=>{
    const response = await fetch("http://localhost:4000/orden");
    const data = await response.json()
    setOrdenes(data)
  }

  const agregarOrden = async () => {
   const res=await fetch("http://localhost:4000/orden/",{
    method: "POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      id_mesa: id_mesa,
      id_menu:idmenu
    }),
   });
   if (res.ok){
    const nuevaOrden = await res.json();
    setOrdenes([...ordenes, nuevaOrden]);
    setId_mesa(0)
    setIdmenu(0)
    console.log("orden agregada");
    obtenerOrdenes()
   }else{
    console.log("fallo al agregar orden");
   }
  };

  const eliminarOrden = async (id) => {
    if (window.confirm(" Desea eliminar esta orden ")) {
      const res = await fetch(`http://localhost:4000/orden/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
    setEditar(true);
    setId_mesa(orden.id_mesa);
  };

  const limpiarCampos = () => {
    setIdmenu(0)
    setId_mesa(0);
    setEditar(false);
  };

  const actualizarOrden = async (id) => {
    const ordenUpdate = {
      id_mesa: setId_mesa(),
    };
    const response = await axios.put(`http://localhost:4000/orden/${id}`, {
      ordenUpdate,
    });
    this.setOrdenes({ updateAt: response.data.updateAt });
  };
  /*async componentDidMount() {
    // PUT request using axios with async/await
    const article = { title: 'React Put Request Example' };
    const response = await axios.put('https://reqres.in/api/articles/1', article);
    this.setState({ updatedAt: response.data.updatedAt });
}*/
  useEffect(() => {
  obtenerOrdenes();
  }, []);

  return (
    <>
      <h1>Ordenes</h1>
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
          placeholder="id menu"
          value={idmenu}
          onChange={(e)=>{
            setIdmenu(e.target.value)
          }}
        />
        <form >
        <div>
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={actualizarOrden}>
                Actualizar
              </button>
              <button
                type="button"
                className="btn btn-info m-2"
                onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={agregarOrden}>
              Agregar
            </button>
          )}
        </div>
      </form>

      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
          
            <th scoope="col">Id Mesa</th>
            <th scope="col">Id menu</th>
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
          
              <td>{orden.id_mesa}</td>
          
              <td>{orden.id_menu}</td>
              <td>{orden.nombre}</td>
              <td>{orden.descripcion}</td>
              <td>{orden.precio}</td>
              <td>
                <div>
                  <button
                    className="m-2 btn btn-danger"
                    onClick={() => {
                      eliminarOrden(orden.id);
                    }}>
                    Eliminar
                  </button>
                  <button
                    className="m-2 btn btn-info"
                    onClick={() => {
                      editarOrden(orden);
                    }}>
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
