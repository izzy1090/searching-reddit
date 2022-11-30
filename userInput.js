// declare a variable to export out to other scripts
let searchTerm = "";
let sortFilter = "hot";
let threadLimit = 0;

// need to write userInput function accepts user search term
// input: search term, thread limit, and sort category
// output: initializes global variables with passed-in args
// declare a function called userInput
function userInput(search, limit, sort) {
    try {
        // if search and threadLimit are found and sort is missing
        if (search && threadLimit > 25 || threadLimit < 100 && !sort) {
            // initialize global variables to match user input
            searchTerm = search
            threadLimit = limit
            console.log("Hot results are shown by default. Thread count caps at 100.") } 
        // if search, threadLimit and sort are found 
        else if (search && threadLimit > 25 || threadLimit < 100 && sort.match(/['relevance','hot','new','comments', 'old']/)) {
            // initialize all variables to passed-in args
            console.log(`Sorting threads by ${sort}... Thread count caps at 100.`)
            searchTerm = search
            threadLimit = limit
            sortFilter = sort } 
        else if (threadLimit > 100 || !sort.match(['relevance','hot','new','comments', 'old'])){
            console.log("Bad search request, your results won't be accurate.") }
    } 
    // else return an error
    catch (err){
        console.log(err)
    }    
}

// for sort pick one of (relevance, hot, top, new, comments, old)
    // at this time date ranges are not possible via Reddit's API
userInput('elden ring', 50, 'old')

// this can be the script I use to run the order of actions for everything

module.exports = {
    searchTerm,
    threadLimit, 
    sortFilter
}