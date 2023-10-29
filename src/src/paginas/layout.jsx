import {Outlet, Link, NavLink} from "react-router-dom"

const Layout = () => {
    return <div>
        <nav>
            <ul>
                <li>
                    <NavLink end className={({isActive})=>isActive ? "active-green" : null} to="/" >Restaurante</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/ordenes" >Ordenes</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/mesas" >Mesas</NavLink>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
}

export default Layout;