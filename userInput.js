// declare a variable to export out to other scripts
let searchTerm = ""
let sortFilter = ""
let limit = 0;

// need to write userInput function accepts user search term
// input: search term, thread limit, and sort category
// output: initializes global variables with passed-in args
// declare a function called userInput
function userInput(search, threadLimit, sort) {
    // if search and threadLimit are found
    if (search && threadLimit && !sort){
        // initialize global variables to match user input
        searchTerm = search
        threadLimit = threadLimit
        console.log('results are sorted by new...')
    }
        // also output console that results are defaulted to new
        // pick from following tags to sort results
    // if search, threadLimit and sort are found initialize all variables
    // else return an error that a bad request was made
}

// for sort pick one of (relevance, hot, top, new, comments, old)
userInput('weather', 27)

// this can be the script I use to run the order of actions for everything

module.exports = {
    searchTerm,
    limit, 
    sortFilter
}