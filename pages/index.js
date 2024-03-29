import IntroMessagePage from './IntroMessagePage';
import SearchBar from './components/SearchBar';
import { apiCall } from './api/api';
import { useState } from 'react';
import ThreadCount from './components/ThreadCount';
import ThreadListPage from './ThreadListPage';
import LoadingAnimation from './components/LoadingAnimation';

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
            setThreads(response.props.threads)
        })
    }

    return ( <>
        <SearchBar onSubmit={handleSubmit} loading={isLoading} handleLoading={setLoading} threads={threads} handleThreads={setThreads}/>
        <div className='page-contents'>
            <div className='flex flex-row items-center'>
                <ThreadCount/>
                {/* <SafeSearch handleSafeSearchToggle={handleSafeSearchToggle}/> */}
            </div>
            <IntroMessagePage loading={isLoading} threads={threads}/>
            {isLoading ? <LoadingAnimation/> : 
                (<ThreadListPage
                    loading={isLoading} 
                    threads={threads}
                    handleDelete={handleDelete}/>
                ) 
            }
        </div> 
    </>
    )
}

export default Index; 