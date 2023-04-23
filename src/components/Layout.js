import {BrowserRouter, Routes, Route, Outlet, Link} from 'react-router-dom'
import '../styling/navbar.css'

function Layout() {
    return (
        <>        
        <div className='nav'> 
            <div className='home-logo'>
                <Link className='nav-item' to="/">My Movie Lookup</Link>
            </div>
            <Link className='nav-item' to="/">Home</Link>
            <Link className='nav-item' to="/movies">Movies</Link>
            <Link className='nav-item' href="">Register</Link>
            <Link className='nav-item' href="">Login</Link>
        </div>

        <Outlet />
        </>
    )
}

export default Layout