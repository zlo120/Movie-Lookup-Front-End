import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import '../styling/searchbar.css'

function Landing() {
    const [searchTitle, setSearchTitle] = useState();
    const [searchYear, setsearchYear] = useState();
    const navigate = useNavigate();

    const titleInputHandler = (e) => {
        setSearchTitle(e.target.value.toLowerCase());
    }

    const yearInputHandler = (e) => {
        setsearchYear(e.target.value);
    }

    const searchMovie = () => {
        navigate(`/movies?title=${searchTitle}&year=${searchYear}`)
        console.log(`search title: ${searchTitle}, search year: ${searchYear}`);
    }

    return (
        <div className='container'>
            <h1>Welcome to My Movie Lookup</h1>
            <form className='container' onSubmit={event => {
                event.preventDefault();
            }} >
                <div className='search-container'>
                    <InputGroup>
                        <Input onChange={titleInputHandler} placeholder='search movie title' />
                        <Input onChange={yearInputHandler} type='number' placeholder='year' className='yearInput' />
                        <Button onClick={searchMovie} type='submit' className='search-btn'>Search</Button>
                    </InputGroup>
                </div>
            </form>
        </div>
    )
}

export default Landing