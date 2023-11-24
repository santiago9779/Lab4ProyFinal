import { Visible } from "./RequireAuth";
import { useState, useEffect } from "react";


export const PersonalPage = () => {
  const [personal, setPersonal] = useState([]);
  const [usuario, setUsuario]=useState('')
  const [password, setPassword]=useState('')
  const [rol, setRol]=useState('')
  const [editar, setEditar]=useState(false)

  useEffect(() => {
    fetch(`http://localhost:4000/personal/`)
      .then((res) => res.json())
      .then((persona) => setPersonal(persona));
  }, []);

  const agregarPersona = async () => {
    const res = await fetch("http://localhost:4000/personal/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      usuario: usuario, 
      password: password, 
      rol: rol
      }),
    });
    if (res.ok) {
      const nuevaPersona = await res.json();
      setPersonal([...personal, nuevaPersona]);
      setUsuario("");
      setPassword("");
      setRol("")
      console.log("persona agregada");
    } else {
      console.log("Fallo al agregar persona");
    }
  };

  const eliminarPersona = async (id) => {
    if (window.confirm(" Desea eliminar esta persona ")) {
      const res = await fetch(`http://localhost:4000/personal/${id}`, {
        method: "DELETE",
        headers: {'Content-Type': 'application/json'}
      });
      if (res.ok) {
        setPersonal(personal.filter((persona) => persona.id !== id));
        console.log("Persona eliminada");
      } else {
        console.log("No se pudo eliminar persona");
      }
    }
  };

  const editarPersona = (persona) => {
    setEditar(true)

    setUsuario(persona.usuario)
    setPassword(persona.password)
    setRol(persona.rol)
  }

  const limpiarCampos = ()=>{
    setUsuario('')
    setPassword('')
    setRol('')
    setEditar(false)  
  }

  const actualizarPersona = async () => {
    axios.put("http://localhost:4000/orden/", {
      fecha: fecha,
      estado: estado,
      id_mesa: id_mesa
    }
  )}

  return (
    <>
      <h1>Mi perfil</h1>
      <Visible rol="jefe">
        <p>
          <h2>Es admin!</h2>
        </p>
      </Visible>
      <Visible rol="empleado">
        <p>
          <h2>Es usuario!</h2>
        </p>
      </Visible>

      <form className="text-center" action="">
        <input
          className="m-2"
          type="text"
          placeholder="usuario"
          value={usuario}
          onChange={(e) => {
            setUsuario(e.target.value);
          }}
        />
        <input
          className="m-2"
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="m-2"
          type="text"
          placeholder="rol"
          value={rol}
          onChange={(e) => {
            setRol(e.target.value);
          }}
        />
        <div>
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={actualizarPersona}>
                Actualizar
              </button>
              <button type="button" className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={agregarPersona}>
              Agregar
            </button>
          )}
        </div>
      </form>
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Usuario</th>
            <th scoope="col">Rol</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personal.map((persona) => (
            <tr key={persona.id}>
              <th scope="row">{persona.id}</th>

              <td>{persona.usuario}</td>
              <td>{persona.rol}</td>
              <td>
                <div>
                  <button
                    className="m-2 btn btn-danger"
                    onClick={()=>{eliminarPersona(orden.id)}}>
                    Eliminar
                  </button>
                  <button className="m-2 btn btn-info" onClick={()=>{editarPersona(persona)}}>Editar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
