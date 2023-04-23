import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-balham.css"

function ResultsTable(results) {

    const columns = [
        { headerName: "Title", field: "title" },
        { headerName: "Year", field: "year" },
        { headerName: "Imdb ID", field: "imdbId" },
        { headerName: "Imdb Rating", field: "imdbRating" },
        { headerName: "Rotten Tomatoes Rating", field: "rottenTomatoesRating" },
        { headerName: "Metacritic Rating", field: "metacriticRating" },
        { headerName: "Classification", field: "classification" },
    ]

    if (results !== null) {
        useEffect(() => {

        }, []);

    } else {
        useEffect(() => {

        }, []);
    }

    return (
        <div
            className="ag-theme-balham"
            style={{ height: "300px", width: "600px" }}
        >
            <AgGridReact
                columnDefs={table.columns}
                rowData={table.rowData}
                pagination
            />
        </div>

    );
}

export default ResultsTable