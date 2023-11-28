import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

export const AuthStatus = () => {
  const { sesion, logout } = useAuthContext();
  const navigate = useNavigate();

  if (!sesion) {
    return <p>Personal No Conectado</p>;
  }

  return (
    <>
      <p>{sesion.usuario} conectado</p>
      <button type="submit" className="btn btn-success"
        onClick={() => {
          logout(navigate);
        }}
      >
        Cerrar Sesión
      </button>
    </>
  );
};
