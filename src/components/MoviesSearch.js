import { useEffect, useState, useCallback } from "react";
import { InputGroup, Input, Button, Alert } from "reactstrap";
import { AgGridReact } from "ag-grid-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MovieDetails from "./MovieDetails.js";
import "../styling/searchbar.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

function MoviesSearch() {
    const [searchContent, setSearchContent] = useState([]);
    const [searchYear, setSearchYear] = useState([]);
    const [movies, setMovies] = useState([]);
    const [noMatchesVisible, setNoMatchesVisible] = useState(false);
    const [wrongFormatVisible, setWrongFormatVisible] = useState(false);

    const onNoMatchesDismiss = () => setNoMatchesVisible(false);
    const onWrongFormatDismiss = () => setWrongFormatVisible(false);

    const columns = [
        { headerName: "Title", field: "title", width: 570, sortable: true },
        { headerName: "Year", field: "year", width: 100, sortable: true },
        {
            headerName: "Imdb Rating",
            field: "imdbRating",
            width: 120,
            sortable: true,
        },
        {
            headerName: "Rotten Tomatoes Rating",
            field: "rottenTomatoesRating",
            width: 200,
            sortable: true,
        },
        {
            headerName: "Metacritic Rating",
            field: "metacriticRating",
            width: 170,
            sortable: true,
        },
        {
            headerName: "Classification",
            field: "classification",
            width: 120,
            sortable: true,
        },
    ];

    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    // pageNumber should never be undefined, should always be at least = 1
    const searchMovie = (pageNumber, movieTitle, year) => {

        let url = "http://sefdb02.qut.edu.au:3000/movies/search?";

        url += `page=${pageNumber}`

        if (movieTitle !== undefined && movieTitle !== "undefined") {
            url += `&title=${movieTitle}`
        }

        if (year !== undefined && year !== "undefined") {
            url += `&year=${year}`
        }

        return fetch(url)
            .then((res) => res.json());
    };

    const titleInputHandler = (e) => {
        setSearchContent(e.target.value.toLowerCase());
    };

    const yearInputHandler = (e) => {
        setSearchYear(e.target.value);
    };

    const handleSubmit = () => {
        navigate(`/movies?page=1&title=${searchContent}&year=${searchYear}`);
        navigate(0);
    }

    const dataSource = {
        getRows: (params) => {
            let pageNumber = 1;

            if (params.startRow !== 0) {
                pageNumber = Math.floor(params.startRow / 100) + 1;
            }

            let movieName = searchParams.get("title");
            let movieYear = searchParams.get("year");

            if (movieName === "undefined" || movieName === null) {
                movieName = undefined;
            } else {
                setSearchContent(movieName);
            }

            if (movieYear === "movieYear" || movieYear === null) {
                movieYear = undefined;
            } else {
                setSearchYear(movieYear);
            }

            searchMovie(pageNumber, movieName, movieYear)
                .then((response) => {

                    if (response.error === true) {
                        throw new Error(response.message);
                    }

                    if (response.pagination.total == 0) {
                        setNoMatchesVisible(true);
                        params.successCallback([], 0);
                    }

                    let data = response.data.map(movie => {
                        let rtRating = "Not Rated";
                        let imdbRating = "Not Rated";
                        let metaRating = "Not Rated";

                        if (movie.rottenTomatoesRating !== null) {
                            rtRating = movie.rottenTomatoesRating + "%";
                        }

                        if (movie.imdbRating !== 0) {
                            imdbRating = movie.imdbRating;
                        }

                        if (movie.metacriticRating !== null) {
                            metaRating = movie.metacriticRating + "%";
                        }

                        return {
                            title: movie.title,
                            year: movie.year,
                            imdbID: movie.imdbID,
                            imdbRating: imdbRating,
                            rottenTomatoesRating: rtRating,
                            metacriticRating: metaRating,
                            classification: movie.classification,
                        };
                    });

                    let lastPage = response.pagination.lastPage;

                    // if on or after the last page, work out the last row.
                    let lastRow = -1;

                    if (pageNumber === lastPage) {
                        lastRow = response.pagination.total;
                    }

                    // call the success callback
                    return params.successCallback(data, lastRow);
                })
                .catch((error) => {
                    console.log(error);
                    if (error.message === "Invalid year format. Format must be yyyy.") {
                        setNoMatchesVisible(false);
                        setWrongFormatVisible(true);
                    }
                    params.failCallback();
                });
        },
    };

    const onGridReady = (params) => {
        params.api.setDatasource(dataSource);
    };

    if (searchParams.get("id") !== null) {
        return <MovieDetails id={searchParams.get("id")} />;
    }

    return (
        <>
            <form
                className="container"
                onSubmit={(event) => {
                    event.preventDefault();
                }}
                style={{ marginTop: "5rem" }}
            >
                <Alert color="danger" isOpen={wrongFormatVisible} toggle={onWrongFormatDismiss}>
                    Invalid year format. Format must be yyyy
                </Alert>
                <Alert color="danger" isOpen={noMatchesVisible} toggle={onNoMatchesDismiss}>
                    No movie matches that search
                </Alert>
                <h2>Search by movie title</h2>
                <InputGroup>
                    <Input
                        onChange={titleInputHandler}
                        placeholder="search movie title"
                        value={searchContent}
                    />
                    <Input
                        onChange={yearInputHandler}
                        type="number"
                        placeholder="year"
                        className="yearInput"
                        value={searchYear}
                    />
                    <Button onClick={handleSubmit} color="primary" type="submit" className="search-btn">
                        Search
                    </Button>
                </InputGroup>
            </form>

            <div
                className="ag-theme-balham container"
                style={{
                    height: "30rem",
                    width: "auto",
                    margin: "auto",
                    marginTop: "3rem",
                    fontSize: "1rem",
                }}
            >
                <AgGridReact
                    columnDefs={columns}
                    rowModelType="infinite"
                    onGridReady={onGridReady}
                    rowBuffer={0}
                    cacheBlockSize={100}
                    cacheOverflowSize={2}
                    maxBlocksInCache={10}
                    onRowClicked={(row) => navigate(`/movies?id=${row.data.imdbID}`)}
                />
            </div>
        </>
    );
}

export default MoviesSearch;
