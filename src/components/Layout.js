import { Outlet, Link, useNavigate } from 'react-router-dom'
import '../styling/navbar.css'
import jwt_decode from 'jwt-decode'

function Layout() {

    let bearerToken = localStorage.getItem("bearerToken");
    let refreshToken = localStorage.getItem("refreshToken");

    const handleLogout = () => {

        let body = {
            refreshToken: refreshToken
        };

        fetch('http://sefdb02.qut.edu.au:3000/user/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        localStorage.setItem("bearerToken", null);
        localStorage.setItem("refreshToken", null);
        navigate("/");
    }

    const navigate = useNavigate();

    if (bearerToken !== "null" && refreshToken !== "null") {
        const token = jwt_decode(bearerToken);
        return (
            <>
                <div className='nav'>

                    <Link className='site-logo nav-item' to="/">My Movie Lookup</Link>

                    <div className='right-side'>
                        <Link className='nav-item' to="/">Home</Link>
                        <Link className='nav-item' to="/movies">Movies</Link>
                        <p id='my-account' className='nav-item'>{token.email}</p>
                        <Link className='nav-item' to="/" onClick={handleLogout}>Log Out</Link>
                    </div>
                </div>

                <Outlet />
            </>
        );
    }

    return (
        <>
            <div className='nav'>

                <Link className='site-logo nav-item' to="/" >My Movie Lookup</Link>

                <div className='right-side'>
                    <Link className='nav-item' to="/">Home</Link>
                    <Link className='nav-item' to="/movies">Movies</Link>
                    <Link className='nav-item' to="/register">Register</Link>
                    <Link className='nav-item' to="/login">Login</Link>
                </div>
            </div >

            <Outlet />
        </>
    )
}

export default Layout