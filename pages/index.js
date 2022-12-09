import Head from 'next/head';
import Image from 'next/image';
import redditLogo from '../public/images/reddit_logo.png'
import { filterData } from "../JS/filterData";
import { useState } from 'react'
import { DropDown, sortSelection } from './dropDownSortFilters';

function Page ( {threads} ) {

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
    const [posts, postThreads] = useState('')
    // declare a function to invoke when clicked on
    const genSearch = () => {
        // call the API with our userInput as a passed-in arg
        apiCall(userInput).then(response=> {
            // if nothing populates, check your console log to ensure map function is accessing
                // correct elements
            console.log(sortSelection)
            // then pass returned response as arg to our postThreads function 
            postThreads(response.props.threads.map(results=>{
                return (
                    <div className="subreddits-container" key={results}>
                        <header id="threads-sizing"><strong>Subreddit</strong>:&nbsp;{results.subreddit}</header>
                        <div id="threads-sizing"><strong>Username</strong>:&nbsp;{results.author_fullname}</div>
                        <div id="threads-sizing"><strong>Thread</strong>:&nbsp;{results.title}</div>
                        <div id="threads-sizing">{results.selftext}</div>
                        <div id="threads-sizing"><strong>Awards Received</strong>:&nbsp;{results.total_awards_received}</div>
                        <div id="threads-sizing"><strong>URL </strong>:&nbsp;<a href={results.url} target='_blank'>{results.url}</a></div>
                    </div>
                )
            }))
        })
    }
    return (
        <>
        <Head>
            <title>Home</title>
            <meta charSet='utf-8'></meta>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        </Head>
            <header>
                <div className="search-container">
                    <Image src={redditLogo} id="search-bar-icons" alt="Png of reddit logo"/>
                    <div id="header-title">subreddits & threads</div>
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
                    {[posts]}
                </div>
            </header>
        </>
    )
}
export const apiCall = async function getStaticProps (searchTerm) {

    console.log('searching...')

    // declared variables to use for OAuth with Reddit's API
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const api_key = process.env.API_KEY;
    const api_secret = process.env.API_SECRET;
    
    const threads = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
            'User-Agent': 'User agent',
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
        return fetch(`https://oauth.reddit.com/r/all/search/?q=${searchTerm}&limit=${100}&sort=${sortSelection}`, 
            { headers: {
                // authorize with previously generated bearerToken here
                Authorization: `bearer ${returnedToken}`}
            })
        // convert response from API call into a JSON
        .then( response => response.json() )
        // then take rawData and filter it through function components from other scripts
        .then( rawData => {
            const childObject = rawData.data;
            return filterData(childObject);
        })
    })
    return {
        props: {
            threads
        }
    }
}

export default Page 