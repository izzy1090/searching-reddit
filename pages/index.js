import IntroMessage from './components/IntroMessage';
import SearchBar from './components/SearchBar';
import { sortSelection } from './components/DropdownSortFilters';
import { apiCall } from './api/api';
import { useState } from 'react';
import ThreadCount from './components/ThreadCount';
import ThreadPage from './next.js-pages/ThreadPage';

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
        console.log(sortSelection)
        // call the API with our searchTerm as a passed-in arg
        apiCall(searchTerm).then((response)=> {
            setLoading(false);   
            setThreads(response.props.threads)
        })
    }
    
    return ( 
        <div className='bg-slate-50 min-h-screen min-w-screen'>
            <SearchBar onSubmit={handleSubmit}/>
            <ThreadCount/>
            { !isLoading && threads.length == 0 ? <IntroMessage/> : null }
            { isLoading ? <div className='loading-animation subreddit-container'>
            <div className='center-animation'><span className="loader-animation"></span></div>
            </div> : <ThreadPage threads={threads} handleDelete={handleDelete}/>}
        </div> 
    )
}

export default Page; 