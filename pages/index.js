import IntroMessagePage from './IntroMessagePage';
import SearchBar from './components/SearchBar';
import { apiCall } from './api/api';
import { useState } from 'react';
import ThreadCount from './components/ThreadCount';
import ThreadListPage from './ThreadListPage';
import LoadingAnimation from './components/LoadingAnimation';
import SafeSearch from './components/SafeSearch';

function Index () {
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
        setLoading(true);
        // call the API with our searchTerm as a passed-in arg
        apiCall(searchTerm).then((response)=> {
            setLoading(false);   
            setThreads(response.props.threads);
        })
    }

    const [ isSafeSearch, setIsSafeSearch ] = useState(true);

    const handleSafeSearchToggle = () => {
        setIsSafeSearch(prevState=> !prevState)
    }

    const filterThreadsBySafeSearch = () => {
        return isSafeSearch ? threads.filter((thread) => !thread.nsfw) : threads;
      };
    
    return ( <>
        <SearchBar onSubmit={handleSubmit}/>
        <div className='page-contents'>
            <div className='flex flex-row items-center'>
                <ThreadCount/>
                {/* <SafeSearch onClick={handleSafeSearchToggle}/> */}
            </div>
            <IntroMessagePage loading={isLoading} threads={threads}/>
            {isLoading ? <LoadingAnimation/> : 
                (<ThreadListPage
                    
                    loading={isLoading} 
                    threads={filterThreadsBySafeSearch()} 
                    handleDelete={handleDelete}/>
                ) 
            }
        </div> 
    </>
    )
}

export default Index; 