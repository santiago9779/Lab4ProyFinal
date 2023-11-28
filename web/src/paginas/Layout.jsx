import { Link, Outlet } from "react-router-dom";
import { AuthStatus } from "./AuthStatus";

export const Layout = () => {
  return (
    <>
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/mesas" className="nav-link">
                mesas
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/menu" className="nav-link">
                menu
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orden" className="nav-link">
                orden
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/personal" className="nav-link">
                personal
              </Link>
            </li>
          </ul>
          <AuthStatus />
        </div>
      </nav>
      <Outlet />
    </>
  );
};
