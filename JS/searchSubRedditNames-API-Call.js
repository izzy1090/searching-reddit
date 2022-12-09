const readFile = require('./readFile-node')
const filter = require('./filterData')

// dependency required for encoding API tokens and keys
const config = require('dotenv').config()

// to use fetch with earlier versions of node
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// dependencies needed to run the script
const fs = require('fs')

// JS files needed to run this script
const run = require('./userInput-node')

// initialize variable to current date 
const today = new Date().toDateString().split(' ').join('_').toLowerCase();
// initialize variable to exact time by mins.
const exactMinute = new Date().getMinutes();
// use previous variable to build unique filename
const uniqueFilename = exactMinute + '_' + today + run.searchTerm.split(' ').join('_')

// declared variables to use for OAuth with Reddit's API
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;
// declared bearer_token variable to initialize 
    // with bearer token returned from OAuth fetch POST below
var bearer_token;

// when invoked function generates access token to use for authentication 
    // while utilizing Reddit's API
// input: nothing
// output: initializes bearer_token with generated access token
const getAccessToken = async () => {
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
// input: searchTerm and filename
// output: raw json data and save a file locally
const oauthSearch = async (filename) => {
    try {
        // promise to fetch a query from reddit's API using user-generated search terms
            // and pull all matching threads
        return await fetch(`https://oauth.reddit.com/subreddits/search/?q=${run.searchTerm}&limit=${run.threadLimit}&type=comment`, 
        { headers: {
            // authorize with previously generated bearer_token here
            Authorization: `bearer ${bearer_token}`}
        })
        // then convert the response of fetch request into a json
        .then( response => response.json() )
        // convert returned json into a string and write it a saved file in the directory
            // may not need this, but it's good having raw data saved locally
        .then( data => {
            const textDoc = JSON.stringify(data)
            fs.writeFile(`${filename}.txt`, textDoc, function(err){
                if(err){
                    console.log(err) }
            })
            console.log(textDoc)
            // return previously initialized variable as an object
            return { textDoc } 
        }) 
        } catch (err){
            console.log(err)
    }
}

// order of function invocations to successfully compile current build
const runScript = async () => {
    try {
        // generate access token for authentication with reddit's API
        return await getAccessToken()
        // authenticate and perform search using user generated search term and save a file locally
        .then(() => { return oauthSearch(`${uniqueFilename}`) })
        // read in saved file from search and assign it to a variable
        .then(() => { return readFile.asyncReadFile(`${uniqueFilename}.txt`) })
        // remove rawData from it's parent object and initialize it to a new object
        .then(rawData => { return filter.isoChildObj(rawData) })
        // then take returned object and initialize it to evaluated
            // results of invoking filterData with object as a passed-in arg
        .then(object => { return filter.filterData(object) })
    } catch (err) {
        console.log(err)
    }
}
// invoke runScript function and log the results to the console
runScript().then(data=>console.log(data))
module.exports = {
    getAccessToken, 
    oauthSearch,
    uniqueFilename
}