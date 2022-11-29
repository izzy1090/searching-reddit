// declare undefined global variables to initialize with userInput function

// function to accept search terms and a date range to find subreddits / threads with matching results
// input: string or strings and a date range
// output: initialize global variables to export out to other scripts
// declare a function userInput - accepted strings should probably be an unknown number of args
function userInput (date, ...search) {
    search.forEach(el=>{
        console.log(el)
    })
}
    // 

// test cases to for userInput func
userInput("12", "yes you", "can do", "that")