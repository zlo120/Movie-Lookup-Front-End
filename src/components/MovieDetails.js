import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/moviedetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";

function MovieDetails(props) {
    let id = props.id;

    const [movie, setMovie] = useState([]);
    const [principals, setPrincipals] = useState([]);
    const [genres, setGenres] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [boxOffice, setBoxOffice] = useState([]);

    const navigate = useNavigate();

    const columns = [
        { headerName: "Name", field: "name", width: 250, sortable: true },
        { headerName: "Category", field: "category", width: 150, sortable: true },
        { headerName: "Characters", field: "characters", width: 320, sortable: true }
    ]

    useEffect(() => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setPrincipals(data.principals);
                setGenres(data.genres);
                setRatings(data.ratings);
                setBoxOffice(data.boxoffice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }))
                return data;
            });
    }, []);

    return (
        <div className='movie-details-container'>
            <div className='movie-details'>
                <h1 className='movie-title'>{movie.title} ({movie.year})</h1>
                <div className='genres-container'>
                    {
                        genres.map(g => {
                            if (g === "Adventure") {
                                return (
                                    <div style={{ backgroundColor: "grey" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Biography") {
                                return (
                                    <div style={{ backgroundColor: "brown" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Sport") {
                                return (
                                    <div style={{ backgroundColor: "green" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Sci-Fi") {
                                return (
                                    <div style={{ backgroundColor: "purple" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Animation") {
                                return (
                                    <div style={{ backgroundColor: "Green" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Fantasy") {
                                return (
                                    <div style={{ backgroundColor: "Purple" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "History") {
                                return (
                                    <div style={{ backgroundColor: "Red" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "War") {
                                return (
                                    <div style={{ backgroundColor: "Purple" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Romance") {
                                return (
                                    <div style={{ backgroundColor: "red" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Action") {
                                return (
                                    <div style={{ backgroundColor: "red" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Comedy") {
                                return (
                                    <div style={{ backgroundColor: "orange" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Family") {
                                return (
                                    <div style={{ backgroundColor: "green" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Crime") {
                                return (
                                    <div style={{ backgroundColor: "purple" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Drama") {
                                return (
                                    <div style={{ backgroundColor: "brown" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Horror") {
                                return (
                                    <div style={{ backgroundColor: "black" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Thriller") {
                                return (
                                    <div style={{ backgroundColor: "Red" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            if (g === "Mystery") {
                                return (
                                    <div style={{ backgroundColor: "Brown" }} className='genre-bubble red'>
                                        {g}
                                    </div>
                                );
                            }

                            return (
                                <div className='genre-bubble green'>
                                    {g}
                                </div>
                            )
                        })
                    }
                </div>
                <p className='detail'>Runtime: {movie.runtime} minutes</p>
                <p className='detail'>Box Office: {boxOffice}</p>

                <p>{movie.plot}</p>

                <div className='ratings'>
                    {ratings.map(r => {
                        if (r.source === "Internet Movie Database") {

                            if (r.value === null) {
                                return (
                                    <div id='imdb'>
                                        <div className='logo-circle'>
                                        </div>
                                        <p style={{ fontSize: ".75rem" }}>Not Rated</p>
                                    </div>
                                )
                            }

                            return (
                                <div id='imdb'>
                                    <div className='logo-circle'>
                                    </div>
                                    <p>{r.value}</p>
                                </div>
                            )
                        }

                        if (r.source === "Rotten Tomatoes") {

                            if (r.value === null) {
                                return (
                                    <div id='rt'>
                                        <div className='logo-circle'>
                                        </div>
                                        <p style={{ fontSize: ".75rem" }}>Not Rated</p>
                                    </div>
                                )
                            }

                            return (
                                <div id='rt'>
                                    <div className='logo-circle'>
                                    </div>
                                    <p>{r.value}%</p>
                                </div>
                            )
                        }

                        if (r.source === "Metacritic") {

                            if (r.value === null) {
                                return (
                                    <div id='metacritic'>
                                        <div className='logo-circle'>
                                        </div>
                                        <p style={{ fontSize: ".75rem" }}>Not Rated</p>
                                    </div>
                                )
                            }

                            return (
                                <div id='metacritic'>
                                    <div className='logo-circle'>
                                    </div>
                                    <p>{r.value}%</p>
                                </div>
                            )
                        }
                    })}
                </div>

                <div
                    className="ag-theme-balham container"
                    style={{ height: "18rem", width: "auto", margin: "auto", marginTop: "3rem", fontSize: "1rem" }}
                >
                    <AgGridReact
                        className='myAgGridTable'
                        columnDefs={columns}
                        rowData={principals}
                        pagination={true}
                        paginationPageSize={7}
                        onRowClicked={(row) => navigate(`/actor?id=${row.data.id}`)}
                    />
                </div>
            </div>

            <div className='movie-poster'>
                <img src={movie.poster} alt={movie.title} />
            </div>
        </div >
    )
}

export default MovieDetails