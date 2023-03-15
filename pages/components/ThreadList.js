import Image from "next/image";
import DeleteButton from '../../public/images/grey-delete-icon.svg'
import DateConverter from "./DateConverter";
import ExpandContent from './ExpandContent';
import Panel from "./Panel";

function ThreadList (
    {   threadId, 
        deleteThread, 
        subredditName, 
        author, 
        date,
        threadName, 
        body, 
        subscriberCount, 
        url
     }){

    function handleDeleteClick(){
        return deleteThread(threadId)
    }

    return (
        <Panel className="subreddit-container">
            <div className="flex flex-row p-1 items-center mb-1 text-xs">
                <a target='_blank' rel="noreferrer"
                    href={`https://www.reddit.com/${subredditName}`}
                    className="font-semibold hover:underline">
                        {subredditName}
                </a>
                <div className="flex flex-row ml-1 text-slate-500">
                    <a target='_blank' rel="noreferrer" 
                        href={`https://www.reddit.com/user/${author}/`}>
                        · post by 
                        <span className="ml-1 hover:underline">
                            u/{author}
                        </span>
                    </a>
                    <span className="flex flex-row ml-1">
                        on <DateConverter date={date} className='ml-1'/>
                    </span>
                </div>
                <Image src={DeleteButton} 
                    alt="Image of an 'x' icon for the delete button."
                    className="w-[10px] h-auto ml-auto cursor-pointer m-2"
                    onClick={ handleDeleteClick }/>
            </div>
            <div className="mb-1 text-base pl-1 pr-1 font-semibold">
                <a target="_blank" rel="noreferrer"
                    href={`https://www.reddit.com${url}`}
                    className="hover:underline">
                    {threadName}
                </a>
            </div>
            <ExpandContent data={body} id={threadId}/>    
            <div className='text-xs pl-1 pr-1'>
                {subscriberCount} subs
            </div>
        </Panel>
    ) 
}

export default ThreadList;