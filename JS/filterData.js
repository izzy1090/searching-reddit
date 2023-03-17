// function pulls subreddit matching search results outs of it's parent object
    // then returns the child object
// input: json to parse through
// output: an object a few steps further into returned json
function isoChildObj(json) {
    // declare variable to store and return desired key / value pair
    let cache = {}
    // if a key matches 'data' key
    if (json['data'] && Object.keys(cache).length === 0){
        // use key/values nested under the parent object to build out new object
        const parentObject = Object.assign(json['data']) 
        // initialize empty cache object with parentObject to store data globally
        cache = parentObject 
    } 
    return cache;
}

// input: accept an object
// output: return an object of key/value pairs
// function accepts a parent object created by isoChildObj and filters it to return our desired key/value pairs
function filterData (object) {
    // if key names match 'children'
    if (object['children']) 
        // map the desired key/value pairs to a new object 
        return object['children'].map((val)=>{
            return {
                id: val.data.id,
                // the subreddit names and their prefix
                subreddit: val.data.subreddit,
                subreddit_name_prefixed: val.data.subreddit_name_prefixed,
                permalink: val.data.permalink,
                // username of the user who posted the thread
                author: val.data.author,
                author_fullname: val.data.author_fullname,
                // this is the user's actual username
                name: val.data.name,
                // Unix representation of when the post was created
                created: val.data.created,
                // title of the thread post
                title: val.data.title,
                // number of subscribers associated w/the subreddit
                subreddit_subscribers: val.data.subreddit_subscribers,
                // links to media posted in the thread
                media: val.data.url,
                ups: val.data.ups,
                permalink: val.data.permalink,
                // number of reactions awarded to the thread
                totalAwardsReceived: val.data.total_awards_received,
                // text from the posted thread
                selftext: val.data.selftext,
                nsfw: val.data.over_18
            } 
        }) 
}

module.exports = {
    isoChildObj,
    filterData
}