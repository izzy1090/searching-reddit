import IntroMessage from './components/IntroMessage';
import SearchBar from './components/SearchBar';
import Thread from './components/Thread';
import { sortSelection } from './components/DropdownSortFilters';
import { apiCall } from './api/api';
import { useState } from 'react';
import ThreadCount from './components/ThreadCount';

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
        <div className='page-contents'> 
            <SearchBar onSubmit={handleSubmit}/>
            <ThreadCount/>
            { !isLoading && threads.length == 0 ? <IntroMessage/> : null }
            { isLoading ? <div className='loading-animation subreddit-container'>
            <div className='center-animation'><span className="loader-animation"></span></div>
            </div> :  
            threads.map((results, id)=>{
                if (results.selftext === '') {
                    results.selftext = 'N/A'
                } 
                results.id = id;
                // declared variable to initialize with a date object using responses return unix timecode
                const responseDates = new Date(results.created * 1000)
                // because getMonth() returns integers 0 for Jan., 1 for Feb.
                    // I had to increment values below 10 and add a '0' afterwards
                function monthConverter(month) {
                    if (month === false){
                        return <div>No date available</div>
                    }
                    if(month >= 0 && month <= 9){
                        let monthToIncrement = month;
                        monthToIncrement++;
                        const addZero = '0' + monthToIncrement;
                        return addZero;
                    } else return month;
                }
                const months = monthConverter(responseDates.getMonth())
                // format returned date object into an appropriate string
                const createdDate = `${months}/${responseDates.getDate()}/${responseDates.getFullYear()}`;
                console.log(results)
                return (
                <div key={id}>
                    <Thread
                        thumbnails={results.thumbnail}
                        deleteThread={handleDelete}
                        threadId={id}
                        subredditName={results.subreddit_name_prefixed} 
                        author={results.author}
                        date={createdDate}
                        threadName={results.title}
                        body={results.selftext}
                        awards={results.total_awards_received}
                        subscriberCount={results.subreddit_subscribers}
                        url={results.permalink}
                    />
                </div> )
                })  
            }
        </div> 
    )
}

export default Page 