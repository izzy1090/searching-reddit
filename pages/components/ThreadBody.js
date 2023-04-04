import { useState } from "react";
import ParseURL from "./UrlParser";

function ThreadBody( {data, id, media, nsfw} ){
    const [ expanded, setIsExpanded ] = useState({});
    if (data || media){
        let content;
        let renderedMedia;
        const checkPngJpg = media.includes('.jpg') || media.includes('.png');
        const checkPrimaryYouTube = media.includes('youtube.com');
        const checkSecondaryYouTube = media.includes('youtu.be');

        const parser = new DOMParser();
        const cleanData = parser.parseFromString(data, 'text/html').body.textContent;

        if (checkPrimaryYouTube){
            media = media.slice(32);
        }
        if (checkSecondaryYouTube){
            media = media.slice(17)
        }
        if (checkPngJpg && nsfw){
            renderedMedia = <>
                <div className="inline-flex p-1 mb-2 border-1 border-solid border-reddit-border-orange">
                    <div className="text-reddit-orange">nsfw</div>
                </div>
                <div className="flex items-center justify-center mt-2 overflow-auto pointer-events-none">
                    <img src={media} alt='Embedded images from Reddit post.' 
                        style={{filter: 'blur(70px)'}}/>
                </div>
            </>
        } else if (checkPngJpg) {
            renderedMedia = <>
                <div className="flex items-center justify-center mt-2">
                    <a target="_blank" rel="noreferrer"
                        href={media}>
                        <img src={media} alt='Embedded images from Reddit post.'/>
                    </a>
                </div>
            </>
        } else if (checkPrimaryYouTube || checkSecondaryYouTube) {
            renderedMedia = <>
                <div className="flex justify-center items-center">
                    <iframe
                        width={560}
                        height={315}
                        src={`https://www.youtube.com/embed/${media}`}
                        title="YouTube video player"
                        allowFullScreen
                        // Each of these allow certain features from YouTube to improve the user experience
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>
            </>
        } 
        else {
            renderedMedia = <>
                <div className="mt-2 text-slate-800">Leave the app...</div>
                <a target="_blank" rel="noreferrer" href={media}>
                    <div className="overflow-auto text-user-link-color hover:underline">
                        {media}
                    </div>
                </a>
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

        if (cleanData.length > 500){
            // if isExpanded has a value
            if (isExpanded){
                // we want to initialize any posts with the true isExpanded variable to display
                return (content = 
                <div className="p-1 text-sm">
                    <div className="overflow-auto whitespace-pre-wrap ">
                        <ParseURL children={cleanData}/>
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
                    <ParseURL children={cleanData}/>   
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
                <ParseURL children={cleanData}/>   
            </div>
            {renderedMedia}
        </div>
        return content;
    }
};

export default ThreadBody;