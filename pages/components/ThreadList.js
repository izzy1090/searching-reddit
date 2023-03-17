import Image from "next/image";
import DeleteButton from '../../public/images/grey-delete-icon.svg'
import Dates from "./Dates";
import PostBody from './PostBody';
import Panel from "./Panel";
import LazyLoad from "react-lazy-load";
import upArrow from '../../public/images/up-arrow.svg';
import subsIcon from '../../public/images/subs-icon.svg'
import awardsIcon from '../../public/images/awards-icon.svg'

function ThreadList (
    {   threadId, 
        deleteThread, 
        subredditName, 
        author, 
        date,
        threadName, 
        body, 
        ups,
        totalAwardsReceived,
        subscriberCount, 
        url, 
        media,
        nsfw
     }){

    function handleDeleteClick(){
        return deleteThread(threadId)
    }

    return (
        <LazyLoad>
            <Panel key={threadId} className="subreddit-container">
                <div className="flex flex-row p-1 items-center text-xs">
                    <a target='_blank' rel="noreferrer"
                        href={`https://www.reddit.com/${subredditName}`}
                        className="font-semibold hover:underline">
                            {subredditName}
                    </a>
                    <div className="flex flex-row text-slate-500 ml-1">
                        <a target='_blank' rel="noreferrer" 
                            href={`https://www.reddit.com/user/${author}/`}>
                            <span className="mr-1">·</span>
                            <span className="mr-1" id="post-user-mobile">post by</span>
                            <span className="hover:underline">
                                u/{author}
                            </span>
                        </a>
                        <div className="flex flex-row ml-1" id="date">
                            · <Dates date={date} className='ml-1'/>
                        </div>
                    </div>
                    <Image src={DeleteButton} 
                        alt="x icon for the delete button."
                        className="w-[10px] ml-auto cursor-pointer"
                        onClick={ handleDeleteClick }/>
                </div>
                <div className="flex flex-row text-xs p-1">
                    <div className="flex flex-row items-center">
                        {ups} <Image src={upArrow} height={15} width={15}
                            alt="Up icon to represent upvotes"
                            className="ml-1"/>
                    </div> 
                    <div className="flex flex-row items-center">
                        <span className="ml-1">·</span>
                        <div className='p-1 flex flex-row'>
                            {subscriberCount} 
                            <Image src={subsIcon} height={14} width={14} 
                                alt="Represents the subscribers icon"
                                className="ml-1"/>
                        </div>
                    </div>
                    <div className="flex flex-row items-center">
                        · {totalAwardsReceived} 
                        <Image src={awardsIcon} height={15} width={15} 
                            alt="Represents awards icon"
                            className="ml-1"/>
                    </div>
                </div>
                <div className="mb-1 text-base pl-1 pr-1 font-semibold">
                    <a target="_blank" rel="noreferrer"
                        href={`https://www.reddit.com${url}`}
                        className="hover:underline">
                        {threadName}
                    </a>
                </div>
                <PostBody data={body} id={threadId} media={media} nsfw={nsfw}/>
            </Panel>
        </LazyLoad>
    ) 
}

export default ThreadList;