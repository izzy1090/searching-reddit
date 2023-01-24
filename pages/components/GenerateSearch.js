function GenerateSearch ({ subredditName, author, date, threadName, body, awards, subscriberCount, url }){
    return (
        <div className="subreddits-container" type={thread} > 
            <div className="thread-sizing">
            <div id='thread-category'>
                <strong>Subreddit</strong></div>
                <div><a href={`https://www.reddit.com/${subredditName}`} 
                            target='_blank'>{results.subreddit_name_prefixed}</a></div>
            </div>
            <div className="thread-sizing"><div id='thread-category'>
                <strong>Username</strong></div>
                <div><a href={`https://www.reddit.com/user/${author}/`} 
                        target='_blank'>{author}</a></div>
            </div> 
            <div className='thread-sizing'><div id='thread-category'></div>
                <strong>Date Created</strong>{date}</div>
            <div className="thread-sizing"><div id='thread-category'>
                <strong>Thread Name</strong>
                </div>{threadName}
            </div>
            <div className="thread-sizing"><div id='thread-category'>
                <strong>Post</strong></div>{body}
            </div>
            <div className="thread-sizing"><div id='thread-category'>
                <strong>Awards Received</strong></div>{awards}
            </div>
            <div className='thread-sizing'><div id='thread-category'>
                <strong>Subreddit Subscriber Count</strong></div>{subscriberCount}
            </div>
            <div className="thread-sizing"><div id='thread-category'>
                <strong>URL</strong></div>
                <div><a href={`https://www.reddit.com${url}`} 
                    target='_blank'>{url}</a></div>
            </div>
        </div>
    ) 
}

export default GenerateSearch