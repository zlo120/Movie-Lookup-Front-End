import { useEffect, useState, useCallback } from "react";
import { InputGroup, Input, Button } from "reactstrap";
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
    let url = "http://sefdb02.qut.edu.au:3000/movies/search?";

    const columns = [
        { headerName: "Title", field: "title", width: 584.79, sortable: true },
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

    const searchMovieByPage = (pageNumber) => {
        return fetch(url + `page=${pageNumber}`)
            .then((res) => res.json())
            .then((data) => data.data);
    };

    const searchMovie = () => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/search?`;

        let movieName = searchContent;
        let movieYear = searchYear;

        if (movieName !== undefined) {
            url += `title=${movieName}&`;
        }

        if (movieYear !== undefined) {
            url += `year=${movieYear}&`;
        }

        console.log(url);
        fetch(url)
            .then((res) => res.json())
            .then((data) => data.data)
            .then((data) => {
                return data.map((movie) => {
                    let rtRating = "";
                    if (movie.rottenTomatoesRating !== 0) {
                        rtRating = movie.rottenTomatoesRating;
                    }

                    return {
                        title: movie.title,
                        year: movie.year,
                        imdbID: movie.imdbID,
                        imdbRating: movie.imdbRating,
                        rottenTomatoesRating: rtRating,
                        metacriticRating: movie.metacriticRating,
                        classification: movie.classification,
                    };
                });
            })
            .then((movies) => setMovies(movies));
    };

    const initialSearch = () => {
        let year = searchParams.get("year");
        let title = searchParams.get("title");

        if (title !== "undefined" && title !== null) {
            url += `title=${title}&`;
        }

        if (year !== "undefined" && year !== null) {
            url += `year=${year}&`;
        }

        console.log(url);
        return fetch(url)
            .then((res) => res.json())
            .then((data) => data.data)
            .then((data) => {
                return data.map((movie) => {
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
            })
            .then((movies) => {
                setMovies(movies);
                return movies;
            });
    };

    const titleInputHandler = (e) => {
        setSearchContent(e.target.value.toLowerCase());
    };

    const yearInputHandler = (e) => {
        setSearchYear(e.target.value);
    };

    const dataSource = {
        getRows: (params) => {
            if (params.startRow !== 0) {
                let pageNumber = Math.floor(params.startRow / 100) + 1;
                searchMovieByPage(pageNumber)
                    .then((data) => {
                        // if on or after the last page, work out the last row.
                        let lastRow = -1;

                        if (pageNumber === 122) {
                            lastRow = 12100 + data.length;
                        }

                        // call the success callback
                        return params.successCallback(data, lastRow);
                    })
                    .catch((error) => {
                        console.error(error);
                        params.failCallback();
                    });
            } else {
                searchMovieByPage(1)
                    .then((data) => {
                        // if on or after the last page, work out the last row.
                        let lastRow = -1;

                        // call the success callback
                        return params.successCallback(data, lastRow);
                    })
                    .catch((error) => {
                        console.error(error);
                        params.failCallback();
                    });
            }
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
                <h2>Search by movie title</h2>
                <InputGroup>
                    <Input
                        onChange={titleInputHandler}
                        placeholder="search movie title"
                    />
                    <Input
                        onChange={yearInputHandler}
                        type="number"
                        placeholder="year"
                        className="yearInput"
                    />
                    <Button onClick={searchMovie} type="submit" className="search-btn">
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
