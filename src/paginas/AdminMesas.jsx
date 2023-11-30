import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";

export const AdminMesas = () => {
  const { sesion } = useAuthContext();
  const [mesas, setMesas] = useState([]);
  const [capacidad, setCapacidad] = useState();
  const [ocupada, setOcupada] = useState();
  const [editar, setEditar] = useState(false);

  const obtenerMesas = async () => {
    const response = await fetch("http://localhost:4000/mesas");
    const data = await response.json();
    setMesas(data);
  };


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
      setOcupada("");
      console.log("Mesa agregada");
      obtenerMesas()
    } else {
      console.log("Fallo al agregar mesa");
    }
  };

  const eliminarMesa = async (id) => {
    if (window.confirm(" Desea eliminar esta mesa ")) {
      const res = await fetch(`http://localhost:4000/mesas/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setMesas(mesas.filter((mesa) => mesa.id !== id));
        console.log("Mesa eliminada");
        obtenerMesas()
      } else {
        console.log("No se pudo eliminar la mesa");
      }
    }
  };

  const editarMesa = (mesa) => {
    setEditar(true);

    setCapacidad(mesa.capacidad);
    setOcupada(mesa.ocupada);
  };

  const limpiarCampos = () => {
    setCapacidad("");
    setOcupada("");
    setEditar(false);
  };

  const actualizarMesa = async () => {
    const res = await fetch("http://localhost:4000/mesas/", {
      method: "PUT",
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
      setOcupada("")
      console.log("Mesa editada");
      obtenerMesas()
    } else {
      console.log("Fallo al editar mesa");
    }
  };
  useEffect(() => {
    obtenerMesas()
  }, []);

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
        <div>
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={actualizarMesa}>
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
              onClick={agregarMesa}>
              Agregar
            </button>
          )}
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">capacidad</th>
            <th scope="col">ocupada</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mesa) => (
            <tr key={mesa.id}>
              <th scope="row">{mesa.id}</th>

              <td>{mesa.capacidad}</td>
              <td>{mesa.ocupada}</td>
              <td>
                <div>
                  <button
                    className="m-2 btn btn-danger"
                    onClick={() => {
                      eliminarMesa(mesa.id);
                    }}>
                    Eliminar
                  </button>
                  <button
                    className="m-2 btn btn-info"
                    onClick={() => {
                      editarMesa(mesa);
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
