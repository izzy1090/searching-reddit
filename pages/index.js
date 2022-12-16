import Image from 'next/image';
import redditLogo from '../public/images/reddit_logo.png'
import { useState } from 'react'
import { DropDown, sortSelection } from './dropDownSortFilters';
import { apiCall } from './api';
import IntroMessage from './introMessage';

function Page ( {} ) {
     // setSearch initializes userInput with whatever strings are entered into the search bar 
        // args are passed into searchItems below to initialize userInput with setSearch
    const [userInput, setSearch] = useState('')
    const searchItems = (search) => {
        setSearch(search)
    }
    // Search Header for the page so you don't have to copy and paste code multiple times
    const searchHeader = ()=>{
        return (
            <>
                <div className="search-container">
                    <Image src={redditLogo} id="reddit-logo" alt="Png of reddit logo"/>
                    <input placeholder='search reddit...' onChange={(event)=> searchItems(event.target.value)} 
                    onKeyDown={function(event){
                        if (event.key === 'Enter') {
                            handleSearch()
                        } 
                    }}
                    typeof='search' id='search-bar'></input>                    
                    <div>{DropDown()}</div>
                </div>
            </>
        )
    }
   
    // use the postThreads function to return threads to the returnedThreads variable
    const [returnedThreads, postThreads] = useState('')
    // used to invoke a search and generate results
    const handleSearch = () => {
        // call the API with our userInput as a passed-in arg
        apiCall(userInput).then(response=> {
            // if nothing populates, check your console to ensure map is accessing
                // the correct elements
            console.log(sortSelection)
            // then pass returned response as arg to our postThreads function 
            postThreads(response.props.threads.map(results=>{
                if (results.selftext === '') {
                    results.selftext = 'N/A'
                } 
                // declared variable to initialize with a date object using responses return unix timecode
                const responseDates = new Date(results.created * 1000)
                // format returned date object into an appropriate string
                const createdDate = `${responseDates.getMonth()}/${responseDates.getDate()}/${responseDates.getFullYear()}`
                return (
                    // Layout of how HTML tags for returned threads
                    <>
                    <div className="subreddits-container">
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Subreddit</strong></div>
                            <div><a href={`https://www.reddit.com/${results.subreddit_name_prefixed}`} 
                                        target='_blank'>{results.subreddit_name_prefixed}</a></div>
                        </div>
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Username</strong></div>
                            <div><a href={`https://www.reddit.com/user/${results.author}/`} 
                                    target='_blank'>{results.author}</a></div>
                        </div>
                        <div className='thread-sizing'><div id='thread-category'></div>
                            <strong>Date Created</strong>{createdDate}</div>
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Thread Name</strong>
                            </div>{results.title}
                        </div>
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Post</strong></div>{results.selftext}
                        </div>
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Awards Received</strong></div>{results.total_awards_received}
                        </div>
                        <div className='thread-sizing'><div id='thread-category'>
                            <strong>Subreddit Subscriber Count</strong></div>{results.subreddit_subscribers}
                        </div>
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>URL</strong></div>
                            <div><a href={`https://www.reddit.com${results.permalink}`} 
                                    target='_blank'>{results.permalink}</a></div>
                        </div>
                    </div>
                    </>
                ) 
            })) 
         }) 
    }
    // Intro page for when the user first loads the site 
        // Essentially if no threads are returned from the API, display the fragment below
    if (returnedThreads === '') {
        return(
            <>
                {searchHeader()}
                {IntroMessage()}
            </>
        )
    } 
    return (
        // Layout of returned HTML tags for the overall page
        <>
            {searchHeader()}
            <div className="page-contents">
                {[returnedThreads]}
            </div>
        </>
    )
}

export default Page 