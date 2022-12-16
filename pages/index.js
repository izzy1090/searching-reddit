import Image from 'next/image';
import redditLogo from '../public/images/reddit_logo.png'
import {filterData} from '../JS/filterData'
import { useState } from 'react'
import { DropDown, sortSelection } from './dropDownSortFilters';

function Page ( {threads} ) {
    const [isLoading, setLoading] = useState(false)

    

    const apiCall = async function getStaticProps (searchTerm) {
        try {
            setLoading(true)
            console.log(isLoading)
            console.log('searching...')
            
            // declared variables to use for OAuth with Reddit's API
            const username = process.env.USERNAME;
            const password = process.env.PASSWORD;
            const api_key = process.env.API_KEY;
            const api_secret = process.env.API_SECRET;
            
            const threads = await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                headers: {
                    // User-Agent was triggering a pre-flight response error, may enable at a later date
                    // 'User-Agent': 'User agent',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // use reddit app's api_key and api_secret for authorization
                        // btoa is a method that creates a Base64-encoded ASCII string - basically converts binary to string
                    'Authorization': 'Basic ' + Buffer.from(`${api_key}:${api_secret}`).toString('base64') },
                    // use the associated account's username and password
                    body: `grant_type=password&username=${username}&password=${password}`})
                // await for response from reddit API and convert response into JSON
                .then( returnedToken => returnedToken.json() )
                // assign return data as key/value pairs to an empty object
                .then( bearerTokenCache => Object.values(bearerTokenCache) )
                // isolate the actual bearer token to return it for the API call below
                .then( bearerToken => bearerToken[0] )
            .then((returnedToken)=> {
                return fetch(`https://oauth.reddit.com/r/all/search/?q=${searchTerm}&sort=${sortSelection}&limit=${100}`, 
                    { headers: {
                        // authorize with previously generated bearerToken here
                        Authorization: `bearer ${returnedToken}`}
                    })
                // convert response from API call into a JSON
                .then( response => response.json() )
                // then take rawData and filter it through function components from other scripts
                .then( rawData => {
                    const childObject = rawData.data;
                    setLoading(false)
                    console.log(isLoading)
                    return filterData(childObject);
                })
                
            })
            return {
                props: {
                    threads
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    

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
        // handleLoading(!isLoading)
        // console.log(isLoading)
        
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
                        <li>2) A loading state to let the user know a search is being made</li><br></br>
                        <li>3) Allow user to remove or hide threads from the web page after the user is done reading</li><br></br>
                        <li>4) Export or download Reddit threads as a PDF to the user's desktop computer</li><br></br>
                        <li>5) Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits</li>
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

// export const apiCall = async function getStaticProps (searchTerm) {
//     console.log('searching...')
    
//     // declared variables to use for OAuth with Reddit's API
//     const username = process.env.USERNAME;
//     const password = process.env.PASSWORD;
//     const api_key = process.env.API_KEY;
//     const api_secret = process.env.API_SECRET;
    
//     const threads = await fetch('https://www.reddit.com/api/v1/access_token', {
//         method: 'POST',
//         headers: {
//             // User-Agent was triggering a pre-flight response error, may enable at a later date
//             // 'User-Agent': 'User agent',
//             'Content-Type': 'application/x-www-form-urlencoded',
//             // use reddit app's api_key and api_secret for authorization
//                 // btoa is a method that creates a Base64-encoded ASCII string - basically converts binary to string
//             'Authorization': 'Basic ' + Buffer.from(`${api_key}:${api_secret}`).toString('base64') },
//             // use the associated account's username and password
//             body: `grant_type=password&username=${username}&password=${password}`})
//         // await for response from reddit API and convert response into JSON
//         .then( returnedToken => returnedToken.json() )
//         // assign return data as key/value pairs to an empty object
//         .then( bearerTokenCache => Object.values(bearerTokenCache) )
//         // isolate the actual bearer token to return it for the API call below
//         .then( bearerToken => bearerToken[0] )
//     .then((returnedToken)=> {
//         return fetch(`https://oauth.reddit.com/r/all/search/?q=${searchTerm}&sort=${sortSelection}&limit=${100}`, 
//             { headers: {
//                 // authorize with previously generated bearerToken here
//                 Authorization: `bearer ${returnedToken}`}
//             })
//         // convert response from API call into a JSON
//         .then( response => response.json() )
//         // then take rawData and filter it through function components from other scripts
//         .then( rawData => {
//             const childObject = rawData.data;
//             return filterData(childObject);
//         })
//     })
//     return {
//         props: {
//             threads
//         }
//     }
// }