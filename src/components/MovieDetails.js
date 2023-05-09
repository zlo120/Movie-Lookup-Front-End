import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styling/moviedetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function MovieDetails(props) {
    let id = props.id;

    const [movie, setMovie] = useState([]);
    const [principals, setPrincipals] = useState([]);
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`
        fetch(url)
            .then(res => res.json())
            .then(data => { 
                setMovie(data); 
                setPrincipals(data.principals);
                setGenres(data.genres);
                return data;
            });
    }, []);

    return (
        <div className='movie-details-container'>
            <div className='movie-details'>
                <h1 className='movie-title'>{movie.title}</h1>
                <div className='genres-container'>
                {
                    genres.map(g => {
                        if (g === "Action") {
                            return (
                                <div className='genre-bubble red'>
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
                <p>Released in: {movie.year}</p>
                {/* Make a table of actors */}
                
                <ul>
                    {
                        principals.map(person => {
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