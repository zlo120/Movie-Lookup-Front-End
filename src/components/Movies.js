import react, { useState } from 'react';

function Movies() {
    const [movie, setMovie] = useState([])
    const [searchContent, setSearchContent] = useState([])

    const searchMovie = () => {
        let movieName = searchContent
        fetch(`http://sefdb02.qut.edu.au:3000/movies/search/?title=${movieName}`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .then(console.log(movie))
            .catch(error => console.error(error))
    }

    const inputHandler = (e) => {
        setSearchContent(e.target.value.toLowerCase())
    }

    return (
        <div>
            <input id="myId" type="search" onChange={inputHandler}></input>
            <button onClick={searchMovie}>click me</button>
        </div>
    )
}

export default Movies