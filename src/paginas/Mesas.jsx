import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

const Mesas = () => {
  const { sesion } = useAuthContext();
  const [mesas, setMesas] = useState([]);
  const [capacidad, setCapacidad]=useState()
  const [ocupada, setOcupada]=useState()
  const [id_orden, setId_orden]=useState()
  const [editar, setEditar]=useState(false)

  useEffect(() => {
    fetch(`http://localhost:4000/mesas/`)
        .then((res)=>res.json())
        .then((mesas)=> setMesas(mesas))
    },[]);

    const agregarMesa = async () => {
      const res = await fetch("http://localhost:4000/mesas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        capacidad: capacidad, 
        ocupada: ocupada, 
        }),
      });
      if (res.ok) {
        const nuevaMesa = await res.json();
        setMesas([...mesas, nuevaMesa]);
        setCapacidad("");
        setEstado("");
        setId_orden("")
        console.log("Mesa agregada");
      } else {
        console.log("Fallo al agregar mesa");
      }
    };
  
    const eliminarMesa = async (id) => {
      if (window.confirm(" Desea eliminar esta mesa ")) {
        const res = await fetch(`http://localhost:4000/mesas/${id}`, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json'}
        });
        if (res.ok) {
          setMesas(mesas.filter((mesa) => mesa.id !== id));
          console.log("Mesa eliminada");
        } else {
          console.log("No se pudo eliminar la mesa");
        }
      }
    };
  
    const editarMesa = (mesa) => {
      setEditar(true)
  
      setCapacidad(mesa.capacidad)
      setOcupada(mesa.ocupada)
      setId_orden(mesa.id_orden)
    }
  
    const limpiarCampos = ()=>{
      setCapacidad('')
      setOcupada('')
      setId_orden('')
      setEditar(false)  
    }
  
    const actualizarMesa = async () => {
      axios.put("http://localhost:4000/mesas/", {
        capacidad: capacidad,
        ocupada: ocupada,
        id_orden: id_orden
      }
    )}

  return (
    <>
      <h1>Mesas</h1>
      <form className="text-center">
          <input
          className="m-2"
            type="text"
            placeholder="capacidad"
            value={capacidad}
            onChange={(e) => {
              setCapacidad(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="text"
            placeholder="ocupada"
            value={ocupada}
            onChange={(e) => {
              setOcupada(e.target.value);
            }}
          />
          <input
          className="m-2"
            type="number"
            placeholder="id orden"
            value={id_orden}
            onChange={(e) => {
              setId_orden(e.target.value);
            }}
          />
          <div>
            {editar ? 
              <div>
                <button  className="btn btn-warning m-2" onClick={actualizarMesa}>Actualizar</button>
                <button type="button" className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
              </div>
              :
              <button type="button" className="btn btn-primary m-2" onClick={agregarMesa}>Agregar
              </button>
            }
          </div>
        </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">capacidad</th>
            <th scope="col">ocupada</th>
            <th scope="col">Id Orden</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id}>
              <th scope="row">{mesa.id}</th>

              <td>{mesa.capacidad}</td>
              <td>{mesa.ocupada}</td>
              <td>{mesa.id_orden}</td>
              <td>
                <div>
                  <button className="m-2 btn btn-danger" onClick={() => {eliminarMesa(mesa.id)}}>
                    Eliminar
                  </button>
                  <button className="m-2 btn btn-info" onClick={() => {editarMesa(mesa)}}>
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
