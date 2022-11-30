const token = require('./searchReddit')
const filter = require('./filterData')
const user = require('./userInput')
const readFile = require('./readFile')

let cache;

const runScript = async () =>{
    try {
        // generate access token for authentication with reddit's API
        return await token.getAccessToken()
        .then(()=>{
            // authenticate and perform search using user generated search term and save a file locally
            return token.oauthSearch(`${token.uniqueFilename}`)
        }).then(()=>{
            // read in saved file from search and assign it to a variable
            return readFile.asyncReadFile(`${token.uniqueFilename}.txt`)
        }).then(rawData=>{
            // remove rawData from it's parent object and initialize it to a new object
            cache = filter.isoSubreddits(rawData)
        })
    } catch (err) {
        console.log(err)
    }
}
// initialize evaluated results of invoking runScript
setTimeout(()=>{
    runScript()
})
setTimeout(()=>{
    console.log(cache)
}, 3000)

// // then use map to push key / value pairs to a new empty object
//     // should be able to reference what key/value pairs you want with "." notation
//     const newObject = output.map(val=>{
//         return {
//             author_fullname: val.data.author_fullname,
//             self_text: val.data.selftext 
//         }
//     })

// invoke function to test if function works, this will also help me better split up my scripts
// const output = isoSubreddits(test)
// const test1 = output.children.map((val)=>{
//     return {
//         author_fullname: val.data.author_fullname,
//         self_text: val.data.selftext 

//     }
// })