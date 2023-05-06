import { Outlet, Link, useNavigate } from 'react-router-dom'
import '../styling/navbar.css'
import jwt_decode from 'jwt-decode'

function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.setItem("bearerToken", null);
        localStorage.setItem("refreshToken", null);
        navigate("/");
    }

    let bearerToken = localStorage.getItem("bearerToken");
    let refreshToken = localStorage.getItem("refreshToken");

    if (bearerToken !== "null" && refreshToken !== "null") {
        const token = jwt_decode(bearerToken);
        return (
            <>
                <div className='nav'>
                    <div className='home-logo'>
                        <Link className='nav-item' to="/">My Movie Lookup</Link>
                    </div>
                    <Link className='nav-item' to="/">Home</Link>
                    <Link className='nav-item' to="/movies">Movies</Link>
                    <p className='nav-item'>{token.email}</p>
                    <Link className='nav-item' to="/" onClick={handleLogout}>Log Out</Link>
                </div>

                <Outlet />
            </>
        );
    }

    return (
        <>
            <div className='nav'>
                <div className='home-logo'>
                    <Link className='nav-item' to="/">My Movie Lookup</Link>
                </div>
                <Link className='nav-item' to="/">Home</Link>
                <Link className='nav-item' to="/movies">Movies</Link>
                <Link className='nav-item' to="/register">Register</Link>
                <Link className='nav-item' to="/login">Login</Link>
            </div>

            <Outlet />
        </>
    )
}

export default Layout