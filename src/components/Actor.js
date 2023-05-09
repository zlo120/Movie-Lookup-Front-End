import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Actor() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [actor, setActor] = useState([]);

    const getActor = (id, bearerToken) => {
        return fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`, {
            headers: { Authorization: `Bearer ${bearerToken}` }
        })
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .catch((error) => {
                console.log(`We ran into an error: ${error}`);
            })
    }

    const handleExpiredJWT = (refreshToken) => {
        let body = {
            "refreshToken": refreshToken
        }

        fetch(`http://sefdb02.qut.edu.au:3000/user/refresh`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                return res;
            })
            .then(res => {
                if (res.error === true && res.message === "JWT token has expired") {
                    navigate('/login');
                } else {                    
                    console.log("saving tokens...")
                    localStorage.setItem("bearerToken", res.bearerToken.token);
                    localStorage.setItem("refreshToken", res.refreshToken.token);
                    getActor(searchParams.get("id"), res.bearerToken.token)
                        .then(res => {
                            console.log("setting actor from handleExpiredJWT...");
                            setActor(res)
                        });
                }
            })
    }

    useEffect(() => {
        let bearerToken = localStorage.getItem("bearerToken");
        let refreshToken = localStorage.getItem("refreshToken");
        if (searchParams.get("id") !== null && bearerToken !== null) {
            const id = searchParams.get("id");
            getActor(id, bearerToken)
                .then(res => {
                    if (res.error === true && res.message === "JWT token has expired") {
                        console.log("jwt token has expired...");
                        handleExpiredJWT(refreshToken);
                    } else {
                        console.log("jwt token has expired...");
                        console.log(res);
                        setActor(res);
                        console.log(actor);
                    }
                })
        }
    }, []);

    return (
        <>
            <h1>{actor.name}</h1>
        </>
    );
}

export default Actor