import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { InputGroup, Input, Button } from 'reactstrap';
import '../styling/searchbar.css'
import bgImage from '../images/dvd-collection.jpg'

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
            <div className='top-half'>
                <h1 className='landing-title'>Welcome to My Movie Look Up</h1>
            </div>
            <form className='search-container' onSubmit={event => {
                event.preventDefault();
            }} >
                <InputGroup>
                    <Input onChange={titleInputHandler} placeholder='search movie title' />
                    <Input onChange={yearInputHandler} type='number' placeholder='year' className='yearInput' />
                    <Button onClick={searchMovie} type='submit' color='primary' className='search-btn'>Search</Button>
                </InputGroup>
            </form>
        </div>
    )
}

export default Landing