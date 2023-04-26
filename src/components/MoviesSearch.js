import { useEffect, useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import { AgGridReact } from "ag-grid-react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import MovieDetails from './MovieDetails.js'
import '../styling/searchbar.css'
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

function MoviesSearch() {
    const [searchContent, setSearchContent] = useState([])
    const [rowData, setRowData] = useState([])

    const columns = [
        { headerName: "Title", field: "title" },
        { headerName: "Year", field: "year" },
        { headerName: "Imdb Rating", field: "imdbRating" },
        { headerName: "Rotten Tomatoes Rating", field: "rottenTomatoesRating" },
        { headerName: "Metacritic Rating", field: "metacriticRating" },
        { headerName: "Classification", field: "classification" }
    ]

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    let query = {}

    console.log(`\n\n\nSearch params: ${searchParams} \n\n\n`);

    let url = `http://sefdb02.qut.edu.au:3000/movies/search?`;

    const searchMovie = () => {
        let movieName = searchContent;
        query = { title: movieName }

        if (query.title !== undefined) {
            url += `title=${query.title}&`
        }

        if (query.year !== undefined) {
            url += `year=${query.year}&`
        }

        if (query.page !== undefined) {
            url += `page=${query.page}`
        }

        fetch(url)
            .then(res => res.json())
            .then(data => data.data)
            .then(data => {
                return data.map(movie => {
                    return {
                        title: movie.title,
                        year: movie.year,
                        imdbID: movie.imdbID,
                        imdbRating: movie.imdbRating,
                        rottenTomatoesRating: movie.rottenTomatoesRating,
                        metacriticRating: movie.metacriticRating,
                        classification: movie.classification
                    }
                });
            })
            .then(movies => setRowData(movies));
    }

    const inputHandler = (e) => {
        setSearchContent(e.target.value.toLowerCase());
    }

    useEffect(() => {
        searchMovie();
    }, []);

    if (searchParams.get("id") !== null) {
        return (
            <MovieDetails id={searchParams.get("id")} />
        )
    }

    return (
        <>
            <form className='container' onSubmit={event => {
                event.preventDefault();
            }}
                style={{ marginTop: "5rem" }}>
                <h2>Search by movie title</h2>
                <InputGroup>
                    <Input onChange={inputHandler} />
                    <Button onClick={searchMovie} type='submit' className='search-btn'>Search</Button>
                </InputGroup>
            </form>

            <div
                className="ag-theme-balham container"
                style={{ height: "18rem", width: "auto", margin: "auto", marginTop: "3rem", fontSize: "1rem" }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={7}
                    onRowClicked={(row) => navigate(`/movies?id=${row.data.imdbID}`)}
                />
            </div>
        </>
    )
}

export default MoviesSearch