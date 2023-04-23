import react, { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import '../styling/searchbar.css'
import ResultsTable from './ResultsTable.js'

function Movies() {
    const [movie, setMovie] = useState([])
    const [searchContent, setSearchContent] = useState([])

    const searchMovie = () => {
        let movieName = searchContent
        console.log(`The search content is: ${movieName}.`)
        fetch(`http://sefdb02.qut.edu.au:3000/movies/search/?title=${movieName}`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                console.log(data);
            })
            .catch(error => console.error(error))
    }

    const inputHandler = (e) => {
        setSearchContent(e.target.value.toLowerCase())
    }

    return (
        <>
            <form className='search-container' onSubmit={event => {
                event.preventDefault();
            }}>
                <h2>Search by movie title</h2>
                <InputGroup>
                    <Input onChange={inputHandler} />
                    <Button onClick={searchMovie} type='submit' className='search-btn'>Search</Button>
                </InputGroup>
            </form>

            <ResultsTable />
        </>
    )
}

export default Movies