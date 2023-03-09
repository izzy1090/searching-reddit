import Image from "next/image";
import DeleteButton from '../../public/images/grey-delete-icon.svg'

function Thread ({threadId, deleteThread, subredditName, author, date, threadName, body, awards, subscriberCount, url }){
    function handleClick(){
        return deleteThread(threadId)
    }
    return (
        <div className="subreddit-container"> 
            <div className="thread-sizing">
                <Image src={DeleteButton} 
                    onClick={ handleClick } 
                    className='delete-button' 
                    alt="Image of an 'x' icon for the delete button."
                />
                <div id='thread-category'>
                    <strong>Subreddit</strong></div>
                    <div><a href={`https://www.reddit.com/${subredditName}`} 
                            target='_blank'>{subredditName}</a></div>
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
                <div className="thread-sizing">
                    <div><a href={`https://www.reddit.com${url}`} 
                        target='_blank'>{url}</a></div>
                </div>
        </div>
    ) 
}

export default Thread