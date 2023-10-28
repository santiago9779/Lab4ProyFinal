import {Outlet, Link, NavLink} from "react-router-dom"

const Layout = () => {
    return <div>
        <nav>
            <ul>
                <li>
                    <NavLink end className={({isActive})=>isActive ? "active-green" : null} to="/" >Home</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/About" >About</NavLink>
                </li>
                <li>
                    <NavLink className={({isActive})=>isActive ? "active-green" : null} to="/dashboard" >Dasboard</NavLink>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
}

export default Layout;