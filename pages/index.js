import Image from 'next/image';
import redditLogo from '../public/images/reddit_logo.png'
import { useState } from 'react'
import { DropDown, sortSelection } from './components/dropDownSortFilters';
import { apiCall } from './api/apiClient';
import IntroMessage from './components/introMessage';

function Page (  ) {
    const [isLoading, setLoading] = useState(false)
    // setSearch initializes userInput with whatever strings are entered into the search bar 
        // args are passed into SearchItems below to initialize userInput with setSearch
    const [userInput, setSearch] = useState('')
    const SearchItems = (search) => {
        setSearch(search)
    }

    // Header where the search bar lives and for the user to enter in search terms
    const SearchHeader = ()=>{
        return (
            <>
                <div className="search-container">
                    <a href='/'><Image src={redditLogo} id="reddit-logo" alt="Png of reddit logo"/></a>
                    <input placeholder='search reddit...' onChange={(event)=> SearchItems(event.target.value)} 
                    onKeyDown={function(event){
                        if (event.key === 'Enter') {
                            setLoading(true)
                            HandleSearch()
                        } 
                    }}
                    typeof='search' id='search-bar'></input>                    
                    <div>{DropDown()}</div>
                </div>
            </>
        )
    }
    
    // use the postThreads function to return threads to the returnedThreads prop
    const [returnedThreads, postThreads] = useState('')
    

    // used to invoke a search and generate results
    const HandleSearch = () => {
        // call the API with our userInput as a passed-in arg
        apiCall(userInput).then(response=> {
            setLoading(false)
            // if nothing populates, check your console to ensure map is accessing
                // the correct elements
            console.log(sortSelection)
            // then pass returned response as arg to our postThreads function 
            postThreads(response.props.threads.map((results)=>{
                if (results.selftext === '') {
                    results.selftext = 'N/A'
                } 


                // declared variable to initialize with a date object using responses return unix timecode
                const responseDates = new Date(results.created * 1000)
                // because getMonth() returns integers 0 for Jan., 1 for Feb.
                    // I had to increment values below 10 and add a '0' afterwards
                function monthConverter(month) {
                    if(month >= 0 && month <= 9){
                        let monthToIncrement = month;
                        monthToIncrement++;
                        const addZero = '0' + monthToIncrement;
                        return addZero;
                    } else return month;
                }
                const months = monthConverter(responseDates.getMonth())
                // format returned date object into an appropriate string
                const createdDate = `${months}/${responseDates.getDate()}/${responseDates.getFullYear()}`


                return (
                    // Layout of how HTML tags for returned threads
                    <>
                    <div className="subreddits-container">
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Subreddit</strong></div>
                            <div><a href={`https://www.reddit.com/${results.subreddit_name_prefixed}`} 
                                        target='_blank'>{results.subreddit_name_prefixed}</a></div>
                        </div>
                        <div className="thread-sizing" key={'key2'}><div id='thread-category'>
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
    return (
        // Layout of returned HTML tags for the overall page
        <>
            {SearchHeader()}
            <div className="page-contents">
                {returnedThreads.length === 0 && isLoading == false ? IntroMessage() : null}
                {isLoading ? <div className='loading-animation'>
                <div className='center-animation'><span className="loader-animation"></span></div>
                </div> : returnedThreads}
            </div>
        </>
    )
}

export default Page 