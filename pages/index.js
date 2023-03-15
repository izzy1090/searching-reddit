import IntroMessagePage from './next.js-pages/IntroMessagePage';
import SearchBar from './components/SearchBar';
import { apiCall } from './api/api';
import { useState } from 'react';
import ThreadCount from './components/ThreadCount';
import ThreadListPage from './next.js-pages/ThreadListPage';

function Page () {
    // loading state to display animation in between searches
    const [ isLoading, setLoading ] = useState(false);
    // state used to return threads from our api call
    const [ threads, setThreads ] = useState([]);

    function handleDelete(threadToDelete) {
        const newThreads = threads.filter((currThread) => {
            return threadToDelete != currThread.id;
        })
        return setThreads(newThreads);
    }

    const handleSubmit = async (searchTerm) => {
        setLoading(true)
        // call the API with our searchTerm as a passed-in arg
        apiCall(searchTerm).then((response)=> {
            setLoading(false);   
            setThreads(response.props.threads)
        })
    }
    
    return ( 
        <div className='page-contents'>
            <SearchBar onSubmit={handleSubmit}/>
            <ThreadCount/>
            { !isLoading && threads.length == 0 ? <IntroMessagePage/> : null }
            { isLoading ? <div className='loading-animation subreddit-container'>
            <div className='center-animation'><span className="loader-animation"></span></div>
            </div> : <ThreadListPage threads={threads} handleDelete={handleDelete}/>}
        </div> 
    )
}

export default Page; 