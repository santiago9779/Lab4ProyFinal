import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import axios from "axios";


export const Menu=()=>{
    const {sesion} = useAuthContext()
    const [menu,setMenu]=useState([])
    const [nombre, setNombre]=useState('')
    const [precio, setPrecio]=useState('')
    const [descripcion, setDescripcion]=useState('')
    const [editar, setEditar]=useState(false)

    useEffect(()=>{
      fetch(`http://localhost:4000/menu`)
          .then((res)=>res.json())
          .then((menu)=>setMenu(menu))
    },[])
    
    const agregarMenu = async () => {
      const res = await fetch("http://localhost:4000/menu/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        nombre: nombre, 
        descripcion: descripcion, 
        precio: precio
        }),
      });
      if (res.ok) {
        const nuevoMenu = await res.json();
        setMenu(...menu, setMenu(nuevoMenu));
        setNombre('')
        setDescripcion("");
        setPrecio("");
        console.log("Menu agregado con exito");
      } else {
        console.log("Fallo al agregar menu");
      }
    };
  
    const eliminarMenu = async (id) => {
      if (window.confirm(" Desea eliminar este menu ")) {
        const res = await fetch(`http://localhost:4000/menu/${id}`, {
          method: "DELETE",
          handers: {'Content-Type': 'application/json'}
        });
        if (res.ok) {
          setMenu(menu.filter((men) => men.id !== id));
          console.log("menu eliminado");
        } else {
          console.log("No se pudo eliminar el menu");
        }
      }
    }

    const editarMenu = (menu)=>{
      setEditar(true)
      setNombre(menu.nombre)
      setDescripcion(menu.descripcion)
      setPrecio(menu.precio)
      console.log("seleccion");
    }

    const limpiarCampos = ()=>{
      setDescripcion('')
      setNombre('')
      setPrecio('')
      setEditar(false)
    }

    return(
        <>
            <h1>Menu</h1>
            <form className="text-center" action="">
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
          {editar ? (
            <div>
              <button className="btn btn-warning m-2">
                Actualizar
              </button>
              <button type="submit" className="btn btn-info m-2"
              onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="submit"
              className="btn btn-primary m-2"
              onClick={agregarMenu}>
              Agregar
            </button>
          )}
        </div>
      </form>

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
            <tr key={men.id}>
              <th scope="row">{men.id}</th>

              <td>{men.nombre}</td>
              <td>{men.descripcion}</td>
              <td>{men.precio}</td>
              <td>
                <div>
                  <button className="m-2 btn btn-danger" onClick={() => {eliminarMenu(men.id)}}>
                    Eliminar
                  </button>
                  <button className="m-2 btn btn-info" onClick={() => {editarMenu(men.id)}}>
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </>
    )
}

