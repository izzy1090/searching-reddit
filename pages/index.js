import Image from 'next/image';
import redditLogo from '../public/images/reddit_logo.png'
import { apiCall } from './apiCall';
import { useState } from 'react'
import { DropDown, sortSelection } from './dropDownSortFilters';

function Page ( {} ) {
    // declare a state with a state variable userInput to initialize with user entered string
        // and a function to update our userInput state variable  
    const [userInput, setSearch] = useState('')
    // declare a function to invoke our state function and pass in the user entered strings
        // as passed-in args
    const searchItems = (search) => {
        setSearch(search)
    }

    // declare a state with a state variable 'posts' to initialize our returned threads with
        // and a postThreads function to then post those results to the page
    const [returnedThreads, postThreads] = useState('')
    // declared function to gen. search when event listener is triggered
    const genSearch = () => {
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
                            <a href={`https://www.reddit.com/${results.subreddit_name_prefixed}`} 
                                                                target='_blank'>{results.subreddit_name_prefixed}</a>
                        </div>
                        <div className="thread-sizing"><div id='thread-category'>
                            <strong>Username</strong></div><a href={`https://www.reddit.com/user/${results.author}/`} 
                                                                target='_blank'>{results.author}</a>
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
                            <strong>URL</strong></div><a href={`https://www.reddit.com${results.permalink}`} 
                                                            target='_blank'>{results.permalink}</a>
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
            <div className="search-container">
                <Image src={redditLogo} id="reddit-logo" alt="Png of reddit logo"/>
                <input placeholder='search reddit...' onChange={(event)=> searchItems(event.target.value)} 
                onKeyDown={function(event){
                    if (event.key === 'Enter') {
                        genSearch()
                    } 
                }}
                typeof='search' id='search-bar'></input>                    
                <div>{DropDown()}</div>
            </div>
            <div className="page-contents">
                <div className='subreddits-container' id='landing-page'>
                    <p><strong>Note From The Developer:</strong></p>
                    <p>Hello and welcome to my Reddit search engine!</p><br></br>
                    <p>Currently you can use the search bar above to enter keyword(s) to generate threads returned from Reddit's API.</p><br></br>
                    <p>The purpose of this project was for me to learn how to interact with Reddit's API to generate results 
                        and dynamically render posts for a user. The program uses <b> JavaScript</b> for functionality, 
                        <b> CSS</b> for styling, <b> React JS</b> for the user interface and <b> Next JS</b> (web dev framework) to act as the linchpin.</p><br></br>
                    <p>Next JS allows JavaScript to make calls to Reddit's API which then dynamically render the response for a user each call.</p><br></br> 

                    <p>If you would like to use this program via <b> Node JS</b> to schedule recurring searches 
                    and download them please visit the GitHub linked below and follow the directions for the ReadMe to use it with your preferred IDE.</p><br></br>

                    <a href='https://github.com/izzy1090/searching-through-sub-reddits' target={'_blank'}>GitHub Repository</a>
                    <br></br><br></br>
                       
                    <p>Planned features include:</p>
                    <ul className='thread-sizing'>
                        <li>1) Search button with color change upon click to indicate to the user a search is being made</li><br></br>
                        <li>2) Remove or hide threads from the web page after the user is done reading</li><br></br>
                        <li>3) Export or download Reddit threads as a PDF to the user's desktop computer</li><br></br>
                        <li>4) Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits</li>
                    </ul>

                    </div>
                
            </div>
        </>
        )
    }
    return (
        // Layout of returned HTML tags for the overall page
        <>
            <div className="search-container">
                <Image src={redditLogo} id="reddit-logo" alt="Png of reddit logo"/>
                <input placeholder='search reddit...' onChange={(event)=> searchItems(event.target.value)} 
                onKeyDown={function(event){
                    if (event.key === 'Enter') {
                        genSearch()
                    } 
                }}
                typeof='search' id='search-bar'></input>                    
                <div>{DropDown()}</div>
            </div>
            <div className="page-contents">
                {[returnedThreads]}
            </div>
        </>
    )
}

export default Page 