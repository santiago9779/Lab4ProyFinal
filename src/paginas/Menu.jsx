export const Menu = ({menu, producto})=>{


  return (
    <>
      <h1>Menu</h1>
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
            <tr key={men.id} onDoubleClick={()=>producto(men)}>
              <th scope="row">{men.id}</th>
              <td>{men.nombre}</td>
              <td>{men.descripcion}</td>
              <td>{men.precio}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
