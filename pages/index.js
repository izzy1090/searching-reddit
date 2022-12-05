// currently: http://localhost:3001/

// JS scripts needed to run this script
const filter = require('../JS/filterData')
const user = require('../JS/userInput')
 
function page ( { results }) {
    return (
        <div>
            <header>
                <div class="search-container">
                    <img src='/public/images/reddit_logo' alt='reddit logo' id="reddit-logo"></img>
                    <div id="header-title">subreddits & threads</div>
                    <div id="search-bar">search reddit...</div>
                </div>
            </header>
            <div>
                <div>
                    {
                        results.map(data=>{
                            return (
                                <div class="subreddits-container" key={data}>
                                    <header id="threads-sizing">{data.subreddit}</header>
                                    <div id="threads-sizing">{data.author_fullname}</div>
                                    <div id="threads-sizing">{data.title}</div>
                                    <div id="threads-sizing">{data.selftext}</div>
                                    <div id="threads-sizing">Awards Received: {data.total_awards_received}</div>
                                    <div id="threads-sizing">URL: {data.url}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
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
    const res = await fetch(`https://oauth.reddit.com/r/all/search/?q=${user.searchTerm}&limit=${user.threadLimit}&sort=${user.sortFilter}`, 
        { headers: {
            // authorize with previously generated bearer_token here
            Authorization: `bearer ${bearerToken}`}
        })
    // take response generated from api call and return it as a json
        // intialize return json to variable
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

export default page