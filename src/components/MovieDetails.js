import { useState, useEffect } from 'react';

function MovieDetails(id) {

    useEffect

    const findMovie = () => {
        let url = `http://sefdb02.qut.edu.au:3000/movies/data/${id}`
    }

    return (
        <h1>ID: {id.id}</h1>
    )
}

export default MovieDetails