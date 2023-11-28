export const Mesas = ({mesas, mesa})=>{

  return (
    <>
      <h1>Mesas</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">capacidad</th>
            <th scope="col">ocupada</th>
          </tr>
        </thead>
        <tbody>
          {mesas.map((mes) => (
            <tr key={mes.id} onDoubleClick={()=>mesa(mes)}>
              <th scope="row">{mes.id}</th>
              <td>{mes.capacidad}</td>
              <td>{mes.ocupada}</td>
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
