import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function Actor() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [actor, setActor] = useState([]);

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
                localStorage.setItem("bearerToken", res.bearerToken.token);
                localStorage.setItem("refreshToken", res.refreshToken.token)
            })
    }

    const getActor = (id, bearerToken) => {
        return fetch(`http://sefdb02.qut.edu.au:3000/people/${id}`, {
            headers: { Authorization: `Bearer ${bearerToken}` }
        })
            .then(res => res.json())
            .catch((error) => {
                console.log(`We ran into an error: ${error}`);
            })
    }

    useEffect(() => {
        let bearerToken = localStorage.getItem("bearerToken");

        if (searchParams.get("id") !== null && bearerToken !== "null") {
            const id = searchParams.get("id");
            getActor(id, bearerToken)
                .then(res => {
                    if (res.error === true && res.message === "JWT token has expired") {
                        console.log("JWT expired...")
                        // handleExpiredJWT();
                        getActor(id, bearerToken)
                            .then(res => setActor(res));
                    } else {
                        return setActor(res);
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