import ThreadList from "../components/ThreadList";

function ThreadListPage ({ threads, handleDelete }){
    const renderedThreads = threads.map((results, i)=>{
        const parser = new DOMParser();
        const cleanText = parser.parseFromString(results.selftext, 'text/html').body.textContent;
        results.id = i;
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
                body={cleanText}
                subscriberCount={results.subreddit_subscribers}
                url={results.permalink}
                media={results.media}/>
        )})  

    return <div>{renderedThreads}</div>
}

export default ThreadListPage;