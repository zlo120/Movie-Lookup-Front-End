import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from "chart.js/auto";

import '../styling/principal.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

function Actor() {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [principal, setPrincipal] = useState([]);
    const [movies, setMovies] = useState([]);

    const [graphData, setGraphData] = useState([]);

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
                if (res.error === true) {
                    throw new Error(res.message);
                } else {
                    console.log("saving tokens...")
                    localStorage.setItem("bearerToken", res.bearerToken.token);
                    localStorage.setItem("refreshToken", res.refreshToken.token);
                    getActor(searchParams.get("id"), res.bearerToken.token)
                        .then(res => {
                            console.log("setting actor from handleExpiredJWT...");
                            setPrincipal(res)
                        });
                }
            })
            .catch(error => {
                if (error.message === "JWT token has expired") {
                    navigate(`/login?id=relogin&actor=${searchParams.get("id")}`)
                }
            })
    }

    const handleLoginBtn = (e) => {
        navigate(`/login?actor=${searchParams.get("id")}`)
    }

    const handleSignupBtn = (e) => {
        navigate(`/register?actor=${searchParams.get("id")}`)
    }

    const columns = [
        { headerName: "Role", field: "category", width: 150, sortable: true },
        { headerName: "Movie", field: "movieName", width: 643, sortable: true },
        { headerName: "Characters", field: "characters", width: 500, sortable: true }
    ]

    const data = {
        labels: movies.map(m => m.movieName),
        datasets: [
            {
                label: 'IMDB Score',
                data: movies.map(m => m.imdbRating),
                backgroundColor: [
                    'rgba(149, 163, 234, 0.8)'
                ],
                borderColor: [
                    'rgba(48, 71, 197, 0.8)'
                ],
                borderWidth: 2
            }
        ]
    };

    useEffect(() => {
        let bearerToken = localStorage.getItem("bearerToken");
        let refreshToken = localStorage.getItem("refreshToken");
        if (searchParams.get("id") !== null && bearerToken !== null) {
            const id = searchParams.get("id");
            getActor(id, bearerToken)
                .then(res => {
                    console.log(res);
                    if (res.error === true && res.message === "JWT token has expired") {
                        console.log("jwt token has expired...");
                        handleExpiredJWT(refreshToken);
                    } else {
                        setPrincipal(res);
                        setMovies(res.roles);

                        // Set data for the graph

                    }
                })
        }
    }, []);

    if (localStorage.getItem("bearerToken") === null) {
        return (
            <>
                <div className='container error-container'>
                    <h1>Oops you have to be logged in to use this page!</h1>
                    <hr></hr>
                    <div className='login-signup'>
                        <Button className='login-btn' onClick={handleLoginBtn}>Log In</Button>
                        <Button className='signup-btn' onClick={handleSignupBtn}>Register</Button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className='container details-container'>
                <h1>{principal.name}</h1>
                <h3>({principal.birthYear} - {principal.deathYear})</h3>

                <div
                    className="ag-theme-balham"
                    style={{ height: "18rem", width: "auto", margin: "auto", marginTop: "3rem", fontSize: "1.2rem" }}
                >
                    <AgGridReact
                        className='myAgGridTable'
                        columnDefs={columns}
                        rowData={movies}
                        pagination={true}
                        paginationPageSize={7}
                        onRowClicked={(row) => navigate(`/movies?id=${row.data.movieId}`)}
                    />
                </div>
                <div className='my-chart-container'>
                    <Bar data={data} />
                </div>
            </div>
        </>
    );
}

export default Actor