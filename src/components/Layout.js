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

        localStorage.removeItem("bearerToken");
        localStorage.removeItem("refreshToken");
        navigate("/");
    }

    const navigate = useNavigate();

    if (bearerToken !== null && refreshToken !== null) {
        const token = jwt_decode(bearerToken);
        return (
            <>
                <div className='nav'>
                    <Link className='site-logo nav-item' to="/">MY MOVIE LOOKUP</Link>

                    <div className='right-side'>
                        <Link className='nav-item' to="/">HOME</Link>
                        <Link className='nav-item' to="/movies">MOVIES</Link>
                        <p id='my-account' className='nav-item'>{token.email}</p>
                        <Link className='nav-item' to="/" onClick={handleLogout}>LOG OUT</Link>
                    </div>
                </div>

                <Outlet />
            </>
        );
    }

    return (
        <>
            <div className='nav'>

                <Link className='site-logo nav-item' to="/" >MY MOVIE LOOK UP</Link>

                <div className='right-side'>
                    <Link className='nav-item' to="/">HOME</Link>
                    <Link className='nav-item' to="/movies">MOVIES</Link>
                    <Link className='nav-item' to="/register">REGISTER</Link>
                    <Link className='nav-item' to="/login">LOGIN</Link>
                </div>
            </div >

            <Outlet />
        </>
    )
}

export default Layout