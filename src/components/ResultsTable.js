import { useEffect, useState } from 'react';
import { AgGridReact } from "ag-grid-react";
import { navigate } from 'react-router-dom';
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

function ResultsTable(query) {

    const [rowData, setRowData] = useState([])

    const columns = [
        { headerName: "Title", field: "title" },
        { headerName: "Year", field: "year" },
        { headerName: "Imdb ID", field: "imdbID" },
        { headerName: "Imdb Rating", field: "imdbRating" },
        { headerName: "Rotten Tomatoes Rating", field: "rottenTomatoesRating" },
        { headerName: "Metacritic Rating", field: "metacriticRating" },
        { headerName: "Classification", field: "classification" },
    ]

    useEffect(() => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/search?`;

        if (query.title !== undefined) {
            url = url + `title=${query.title}&`
        }

        if (query.year !== undefined) {
            url = url + `year=${query.year}&`
        }

        if (query.page !== undefined) {
            url = url + `page=${query.page}`
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
    }, []);

    return (
        <div
            className="ag-theme-balham container"
            style={{ height: "300px", width: "auto", margin: "auto", marginTop: "3rem" }}
        >

            <AgGridReact
                columnDefs={columns}
                rowData={rowData}
                pagination={true}
                paginationPageSize={7}
            />
        </div>

    );
}

export default ResultsTable