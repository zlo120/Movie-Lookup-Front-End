import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styling/moviedetails.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieDetails(props) {
    let id = props.id;

    const [movie, setMovie] = useState([]);
    const [actors, setActors] = useState([]);
    useEffect(() => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => { setMovie(data); return data })
            .then(data => {

                let actors = data.principals.filter(person => {
                    if (person.category === "actor" || person.category === "actress") {
                        return person;
                    }
                });

                setActors(actors);
            })
    }, []);

    return (
        <div className='movie-details-container'>
            <div className='movie-details'>
                <h1>{movie.title}</h1>
                <p>Released in: {movie.year}</p>

                <ul>
                    {
                        actors.map(person => {
                            let link = `/actor?id=${person.id}`
                            return <li><Link to={link}>{person.name}</Link></li>
                        })
                    }
                </ul>
            </div>

            <div className='movie-poster'>
                <img src={movie.poster} alt={movie.title} />
            </div>
        </div>
    )
}

export default MovieDetails