// Scripts required to run this script
const tokens = require('./searchReddit')

// function pulls subreddit matching search results outs of it's parent object
    // then returns back an object of threads
// input: json to parse through
// output: an object a few steps further into returned json
function isoSubreddits(json) {
    // declare variable to store and return desired key / value pair
    let cache = {}
    // iterate through json object 
    for (const key in json){
        // if a key matches 'data' key
        if (key === 'data' && Object.keys(cache).length === 0){
            // use key/values nested under the parent object to build out new object
            const parentObject = Object.assign(json[key]) 
            // initialize empty cache object with parentObject to store data globally
            cache = parentObject } 
    } 
    console.log(cache)
    // return cache
    return cache
}



// invoke function to test if function works, this will also help me better split up my scripts
// const output = isoSubreddits(test)
// const test1 = output.children.map((val)=>{
//     return {
//         author_fullname: val.data.author_fullname,
//         self_text: val.data.selftext 

//     }
// })


