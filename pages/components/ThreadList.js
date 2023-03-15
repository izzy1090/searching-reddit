import Image from "next/image";
import DeleteButton from '../../public/images/grey-delete-icon.svg'
import DateConverter from "./DateConverter";

function ThreadList (
    {   threadId, 
        deleteThread, 
        subredditName, 
        author, 
        date,
        threadName, 
        body, 
        awards, 
        subscriberCount, 
        url,
        linkFlairText,
        linkFlairBgColor
     }){

    function handleDeleteClick(){
        return deleteThread(threadId)
    }

    return (
        <div className="text-sm">
            <div className="flex flex-row items-center mb-2 text-xs">
                <a target='_blank' rel="noreferrer"
                    href={`https://www.reddit.com/${subredditName}`}
                    className="font-semibold hover:underline">
                        {subredditName}
                </a>
                <div className="flex flex-row ml-1 text-slate-500">
                    <a target='_blank' rel="noreferrer" 
                        href={`https://www.reddit.com/user/${author}/`}>
                        · post by 
                        <span className="hover:underline">
                            u/{author}
                        </span>
                    </a>
                    <span className="flex flex-row ml-1">
                        on <DateConverter date={date} className='ml-1'/>
                    </span>
                </div>
                <Image src={DeleteButton} 
                    alt="Image of an 'x' icon for the delete button."
                    className="w-[13px] h-auto ml-auto cursor-pointer"
                    onClick={ handleDeleteClick }/>
            </div>
            <div className="mb-1 text-base font-semibold">
                <a target="_blank" rel="noreferrer"
                    href={`https://www.reddit.com${url}`}
                    className="hover:underline">
                    {threadName}
                </a>
            </div>
            <div className="text-sm mb-2">
                {linkFlairText && <div className="mb-2" style={{
                    borderRadius: '2rem',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    display:'inline-block', 
                    backgroundColor: linkFlairBgColor || 'orange'}}>
                {linkFlairText} </div>}
            </div>
            
            <div>
                {body}
            </div>
            <div className="thread-sizing"><div id='thread-category'>
                <strong>Awards Received</strong></div>{awards}
            </div>
            <div className='thread-sizing'><div id='thread-category'>
                <strong>Subreddit Subscriber Count</strong></div>{subscriberCount}
            </div>
        </div>
    ) 
}

export default ThreadList;