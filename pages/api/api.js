import { sortSelection } from "../components/DropdownSortFilters";
import { filterData } from "../../JS/filterData";
import { threadCount } from "../components/ThreadCount";

export const apiCall = async function getStaticProps (searchTerm) {  
    try {
        console.log('searching...')
        // declared variables to use for OAuth with Reddit's API
        const username = process.env.USERNAME;
        const password = process.env.PASSWORD;
        const api_key = process.env.API_KEY;
        const api_secret = process.env.API_SECRET;

        const threads = await fetch('https://www.reddit.com/api/v1/access_token', {
            method: 'POST',
            headers: {
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
            return fetch(`https://oauth.reddit.com/r/all/search/?q=${searchTerm}&sort=${sortSelection}&limit=${threadCount}`, 
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
    } catch (error) {
        console.log(error)
    }
}

export default apiCall