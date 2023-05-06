import { useState, useEffect } from 'react';
import '../styling/moviedetails.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieDetails(props) {
    let id = props.id;

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => { setMovie(data) })
    }, []);

    return (
        <div className='movie-details-container'>
            <div className='movie-details'>
                <h1>{movie.title}</h1>
                <p>Released in: {movie.year}</p>
            </div>

            <div className='movie-poster'>
                <img src={movie.poster} alt={movie.title} />
            </div>
        </div>
    )
}

export default MovieDetails