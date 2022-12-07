// JS scripts needed to run this script
const filter = require('../JS/filterData')
const user = require('../JS/userInput')

// imports necessary for HTML
import Head from 'next/head';
import Image from 'next/image';
import redditLogo from '../public/images/reddit_logo.png'
import searchButton from '../public/images/magnifying-glass.jpg'
import { useState } from 'react';

// declare a variable to export out to other scripts
let searchTerm = "";
let sortFilter = "";
let threadLimit = 0;

 
function homePage ( { results }) {
    const [searchInput, setSearchInput] = useState([]);

    const searchItems = (searchTerm) => {
        setSearchInput(searchTerm)
    }
    function genSearch() {
        const s = searchInput
        console.log(results)
        userInput(s, 100, 'old')
    }
    
    const posts = results.map(data=>{
        return (
            <div className="subreddits-container" key={data}>
                <header id="threads-sizing">{data.subreddit}</header>
                <div id="threads-sizing">{data.author_fullname}</div>
                <div id="threads-sizing">{data.title}</div>
                <div id="threads-sizing">{data.selftext}</div>
                <div id="threads-sizing">Awards Received: {data.total_awards_received}</div>
                <div id="threads-sizing">URL: {data.url}</div>
            </div>
        )
    });    
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
                    <input placeholder='search reddit...' onChange={ (e) => searchItems(e.target.value) } type='search' id='search-bar'></input>
                    <Image src={searchButton} id="search-bar-icons" onClick={genSearch} alt='Graphic illustration of a magnifying glass'/>
                </div>
                <div className="page-contents">
                    {posts}
                </div>
            </header>
        </>
    )
}

// function required for next js to make API calls 
    // server side instead of client side
export async function getServerSideProps(context) {
    // declared variables to use for OAuth with Reddit's API
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const api_key = process.env.API_KEY;
    const api_secret = process.env.API_SECRET;
    
    // declared bearer_token variable to initialize 
    // with bearer token returned from OAuth fetch POST below
    
    // fetch data from external API
    const req = await fetch('https://www.reddit.com/api/v1/access_token', {
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
        const returnedToken = await req.json()
        // initialized created JSON to values of an empty object
        const bearerTokenCache = Object.values(returnedToken)
        // assign the first key/value pair to bearer token cache
        const bearerToken = bearerTokenCache[0]
    // use request generated from above fetch to pass-in a bearer token to authenticate API call
    const res = await fetch(`https://oauth.reddit.com/r/all/search/?q=${searchTerm}&limit=${threadLimit}&sort=${sortFilter}`, 
        { headers: {
            // authorize with previously generated bearer_token here
            Authorization: `bearer ${bearerToken}`}
        })
    // take response generated from api call and return it as a json
        // initialize return json to variable
    const rawData = await res.json()
    // then process rawData with a filter to remove it from its parent object
    const trimData = filter.isoChildObj(rawData)
    // then process the results again with a second filter to map out the results to an object
    const results = filter.filterData(trimData)
    return {
      props: {
        results
      } 
    }
}

export default homePage



// need to write userInput function accepts user search term
// input: search term, thread limit, and sort category
// output: initializes global variables with passed-in args 
function userInput(search, limit, sort) {
    try {
        // if search and threadLimit are found and sort is missing
        if (search && threadLimit > 25 || threadLimit < 100 && !sort) {
            // initialize global variables to match user input
            searchTerm = search
            threadLimit = limit
            console.log("Hot results are shown by default. Thread count caps at 100.") } 
        // if search, threadLimit and sort are all found 
        else if (search && threadLimit > 25 || threadLimit < 100 && sort.match(/['relevance','hot','new','comments', 'old']/)) {
            // initialize all variables to passed-in args
            console.log(`Sorting threads by ${sort}... Thread count caps at 100.`)
            searchTerm = search
            threadLimit = limit
            sortFilter = sort } 
        // if thread count is greater than 100 or sort doesn't match log error message
        else if (threadLimit > 100 || !sort.match(['relevance','hot','new','comments', 'old'])) {
            console.log("Bad search request, your results won't be accurate.") }
    } 
    // else return an error
    catch (err){
        console.log(err)
    }    
}