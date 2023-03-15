import Image from 'next/image'
import redditLogo from '../../public/images/reddit_logo.png'
import searchButton from '../../public/images/not-active-magnifying-glass-icon_vecteezy.svg'
import DropdownSort from './DropdownSort';
import { useState } from 'react';

function SearchBar ( { onSubmit } ) {
    const [ searchTerm, setSearch ] = useState('');

    // for catching the form elements default browser behavior 
    // and submitting a search to the api
    const handleSubmit = (event) => {
        event.preventDefault(event);
        onSubmit(searchTerm);
    }
    // Captures search terms entered into the search bar.
    const handleChange = (event) => {
        setSearch(event.target.value)
    }
    return (
        <div className='search-container'>
            <a href='/'> <Image src={redditLogo} 
                id="reddit-logo" 
                alt="Png of reddit logo"/></a>
            <form type='hidden' className='search-bar-form' onSubmit={handleSubmit}>
                <input className='search-bar-input text-sm' placeholder='search reddit..' onChange={handleChange}></input>
            </form>
            <Image src={searchButton} 
                    className='search-button' 
                    alt='Svg of magnifying glass, image pulled from "Vecteezy.com"'
                    onClick={handleSubmit}/>
            <DropdownSort/>
        </div>
    )
}

export default SearchBar