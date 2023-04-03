import ThreadList from "./components/ThreadList";

function ThreadListPage ({ threads, handleDelete, loading, mediaMetadata }){
    
    let renderedThreads;
    if (threads && !loading){
        renderedThreads = threads.map((results)=>{
            const parser = new DOMParser();
            const cleanBodyText = parser.parseFromString(results.selftext, 'text/html').body.textContent;
            return (
                <ThreadList 
                    key={results.id}
                    thumbnails={results.thumbnail}
                    deleteThread={handleDelete}
                    threadId={results.id}
                    subredditName={results.subreddit_name_prefixed} 
                    author={results.author}
                    date={results.created}
                    threadName={results.title}
                    body={cleanBodyText}
                    ups={results.ups}
                    subscriberCount={results.subreddit_subscribers}
                    totalAwardsReceived={results.totalAwardsReceived}
                    url={results.permalink}
                    media={results.media}
                    nsfw={results.nsfw}
                    />
            )})  
        } else return null;

    return <div>{renderedThreads}</div>
    
}

export default ThreadListPage;