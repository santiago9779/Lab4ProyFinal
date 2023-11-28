import { useState, useEffect, forwardRef } from "react";

export const Ordenes = forwardRef(({items, item},ref)=>{
  const [total, setTotal]=useState(0)
  useEffect(()=>{
    setTotal(items.reduce((sum, item)=> sum + parseFloat(item.Importe), 0 ))
  },[items])
return (
    <>
      <h4>ordenes</h4>
      <div ref={ref} className="container">
      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha</th>
            <th scope="col">Estado</th>
            <th scoope="col">Id menu</th>
            <th scoope="col">Descripcion</th>
            <th scoope="col">Precio</th>
          </tr>
        </thead>
        <tbody>
          {items.map((orden) => (
            <tr key={orden.id} onDoubleClick={()=> item(orden)}>
              <th scope="row">{orden.id}</th>

              <td>{orden.fecha}</td>
              <td>{orden.estado}</td>
              <td>{orden.id_menu}</td>
              <td>{orden.descripcion}</td>
              <td>{orden.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>TOTAL: $ {total.toLocaleString("es-AR")}</h3>
      </div>
    </>
  );
});
