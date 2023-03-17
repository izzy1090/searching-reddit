import { useState } from "react";

function PostBody( {data, id, media, nsfw} ){
    const [ expanded, setIsExpanded ] = useState({});
    if (data || media){
        let content;
        let renderedMedia;
        const checkMediaFormat = media.includes('jpg') || media.includes('png');

        if (checkMediaFormat){
            if (checkMediaFormat && nsfw){
                renderedMedia = <>
                <div className="inline-flex p-1 mb-2 border-1 border-solid border-reddit-border-orange">
                    <div className="text-reddit-orange">nsfw</div>
                </div>
                <div className="flex items-center justify-center mt-2 overflow-auto pointer-events-none">
                    <img src={media} alt='Embedded images from Reddit post.' 
                        style={{filter: 'blur(70px)'}}/>
                </div>
            </>
            } else renderedMedia = <>
                <div className="flex items-center justify-center mt-2">
                    <a target="_blank" rel="noreferrer"
                        href={media}>
                        <img src={media} alt='Embedded images from Reddit post.'/>
                    </a>
                </div>
            </>
        }
        // Function passes the posts ID to the setter function
        const handleExpand = (postId) => {
            // if the postId in the expanded state is false
            if (!expanded[postId]){
                // then spread prevExpanded states and set the current one to be true - handles show button
                setIsExpanded(prevExpanded => ({...prevExpanded, [postId]: true}))
            // otherwise spread the previous states and set them to false - handles hide button
            } else setIsExpanded(prevExpanded => ({...prevExpanded, [postId]: false}))
        }
        // then init. the expanded variable to the expanded state with the post's ID as a key
        const isExpanded = expanded[id];

        if (data.length > 500){
            // if isExpanded has a value
            if (isExpanded){
                // we want to initialize any posts with the true isExpanded variable to display
                return (content = 
                <div className="p-1 text-sm">
                    <div className="overflow-auto whitespace-pre-wrap ">
                        {data}   
                    </div>
                    {renderedMedia}
                    <button onClick={()=>handleExpand(id)} 
                        className="mt-1 text-slate-500 text-xs font-semibold hover:underline">
                        Hide
                    </button>
                </div>
                )
            } else return content = <div className="p-1 text-sm">
                <div className="truncate overflow-auto max-h-40 whitespace-pre-wrap">
                    {data}   
                </div>
                {renderedMedia}
                <button onClick={()=>handleExpand(id)} 
                    className="mt-2 pt-1 text-slate-500 text-xs font-semibold hover:underline">
                    See more...
                </button>
            </div>
        // otherwise render post normally
        } else content = <div className="p-1 text-sm">
            <div className="overflow-auto whitespace-pre-wrap">
                {data}   
            </div>
            {renderedMedia}
        </div>
        return content;
    }
};

export default PostBody;