import Thread from "../components/Thread";
import Panel from "../components/Panel";

function ThreadPage ({ threads, handleDelete }){
    const renderedThreads = threads.map((results, id)=>{
        if (results.selftext === '') {
            results.selftext = 'N/A'
        } 
        results.id = id;
        
        return (
            <Panel key={id}>
                <Thread
                    thumbnails={results.thumbnail}
                    deleteThread={handleDelete}
                    threadId={id}
                    subredditName={results.subreddit_name_prefixed} 
                    author={results.author}
                    date={results.created}
                    threadName={results.title}
                    body={results.selftext}
                    awards={results.total_awards_received}
                    subscriberCount={results.subreddit_subscribers}
                    url={results.permalink}
                    linkFlairText={results.linkFlairText}
                    linkFlairBgColor={results.linkFlairBgColor}
                />
            </Panel> 
        )})  

    return <div>{renderedThreads}</div>
}

export default ThreadPage;