const fs = require('fs')
const { readFileSync, promises: fsPromises } = require('fs')

// async func. to read in file and convert it into an array of objects
// input: text file 
// output: array of objects
const asyncReadFile = async (filename) => {
    try {
        // awaits promises for 'fs' to read in saved file
        const contents = await fsPromises.readFile(filename, 'utf-8');
        // then parse the response into an array of objects
        const backToJson = JSON.parse(contents)
        // return it when we're done
        return backToJson
    } 
    catch (err) {
        console.log(err)
    }
}
module.exports = {
    asyncReadFile
}