import ReactLinkify from "react-linkify";

function ParseURL({children}){
    return <ReactLinkify componentDecorator={(decoratedHref, decoratedText, key)=>
        
        (<a key={key} href={decoratedHref} 
            target="_blank" rel="noopener noreferrer"
            className="text-user-link-color hover:underline">
            {decoratedText}
        </a>)}>
            {children}
    </ReactLinkify>
}

export default ParseURL;