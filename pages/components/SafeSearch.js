import { useEffect, useState } from "react";

function SafeSearch({ threads, handleThreads }){
    // const [ isSafeSearch, setSafeSearch ] = useState(false);

    // const handleFilterThreads = ()=>{
    //     const filterThreads = handleThreads(threads.filter( thread => !thread.nsfw ))
    //     isSafeSearch ? filterThreads : null
    // }

    // const handleSafeSearch = () => {
    //     setSafeSearch(!isSafeSearch)
    //     if (isSafeSearch){
    //         handleFilterThreads()
    //         console.log(isSafeSearch)
    //     } else if (!isSafeSearch){console.log(isSafeSearch)}
    // }

    // useEffect(()=>{
    //     if (!threads){
    //         console.log(isSafeSearch)
    //         handleFilterThreads()
    //     }
    // },[threads])

    return (<div className="pl-3 pb-3">
        <button className="border-1 border-1 border-solid border-reddit-border-orange">
           Safe Search
        </button> 
    </div>)
    
}

export default SafeSearch;