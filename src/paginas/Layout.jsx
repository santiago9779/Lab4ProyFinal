import {Outlet, Link, NavLink} from "react-router-dom"
import { AuthStatus } from "./AuthStatus";

const Layout = () => {
    return <div>
        <AuthStatus/>
            <nav>
                <ul>
                    <li>
                        <NavLink end className={({isActive})=>isActive ? "active-green" : null} to="/" >Restaurante</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/login">Login</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/personal">Personal</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/orden" >Ordenes</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/mesas" >Mesas</NavLink>
                    </li>
                    <li>
                        <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/menu" >Menu</NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet/>
    </div>
}

export default Layout;