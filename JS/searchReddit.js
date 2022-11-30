// JS files needed to run this script
const token = require('./authenticateAPI')
const filter = require('./filterData')
const user = require('./userInput')
const readFile = require('./readFile')

// order of function invocations to successfully compile current build
const runScript = async () => {
    try {
        // generate access token for authentication with reddit's API
        return await token.getAccessToken()
        // authenticate and perform search using user generated search term and save a file locally
        .then(() => { return token.oauthSearch(`${token.uniqueFilename}`) })
        // read in saved file from search and assign it to a variable
        .then(() => { return readFile.asyncReadFile(`${token.uniqueFilename}.txt`) })
        // remove rawData from it's parent object and initialize it to a new object
        .then(rawData => { return filter.isoChildObj(rawData) })
        // then take returned object and initialize it to evaluted
            // results of invoking filterData with object as a passed-in arg
        .then(object => { return filter.filterData(object) })
    } catch (err) {
        console.log(err)
    }
}
// invoke runScript function and log the results to the console
runScript().then(data=>console.log(data))