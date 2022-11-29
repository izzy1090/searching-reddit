// dependency required for encoding API tokens and keys
const config = require('dotenv').config()

// dependencies needed to run the script
const fs = require('fs')

// declared variables to use for OAuth with Reddit's API
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
// declared bearer_token variable to initialize 
    // with our bearer token returned from OAuth fetch POST function below
var bearer_token;

// when invoked function generates access token to use for authentication 
    // while utilizing Reddit's API
// input: nothing
// output: initializes bearer_token with generated access token
const getRedditAccessToken = async () => {
    try {
        // first make a post request to reddit's API for an access_token
        return await fetch('https://www.reddit.com/api/v1/access_token', {
                method: 'POST',
                headers: {
                    'User-Agent': 'User agent',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    // use reddit app's api_key and api_secret for authorization
                        // btoa is a method that creates a Base64-encoded ASCII string - basically converts binary to string
                    'Authorization': 'Basic ' + Buffer.from(`${api_key}:${api_secret}`).toString('base64') },
                // use the associated account's username and password
                body: `grant_type=password&username=${username}&password=${password}`})
        // then return the bearerToken as a JSON
        .then(getBearerToken=>{
            return getBearerToken.json() })
        .then(returnedToken=> {
            // then initialize returnedJSON to values of an empty object
            const bearerTokenCache = Object.values(returnedToken)
            // return earlier declared bearer_token 
            // initialized to corresponding value of the first key in cache object 
            return bearer_token = bearerTokenCache[0] }) }
    catch (err){
        console.log(err)
    }
}

// when invoked, function authenticates w/Reddit's API and 
    // creates a file as well as returns search results based on user-generated parameters
const searchReddit = async (filename) => {
    try {
        // promise to fetch a query from reddit's API using user-generated search terms
            // and pull all matching threads
        return await fetch("https://oauth.reddit.com/r/all/search?q=gundams&sort=new", {
        headers: {
            // authorize with previously generated bearer_token here
            Authorization: `bearer ${bearer_token}`}
        })
        // then convert the response of fetch request into a json
        .then( response => response.json() )
        // convert returned json into a string and write it a saved file in the directory
            // may not need this, but it's good having raw data saved locally
        .then( data => {
            const textDoc = JSON.stringify(data)
            const file = fs.writeFile(`${filename}.txt`, textDoc, function(err){
                if(err){
                    console.log(err) }
            })
            return textDoc })
        // log our search results to the console to see what we're working with
        .then(searchResults=>console.log(searchResults))
    } catch (err){
        console.log(err)
    }

}

getRedditAccessToken();
setTimeout(()=>[
    searchReddit('test')
], 2000)
