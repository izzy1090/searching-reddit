import IntroMessage from './components/introMessage';
import SearchBar from './components/SearchBar';
import GenerateSearch from './components/GenerateSearch';
import { sortSelection } from './components/DropdownSortFilters';
import { apiCall } from './api/api';
import { useState } from 'react';

function Page () {
        // loading state to display animation in betwee searches
        const [ isLoading, setLoading ] = useState(false);
        // state used to return threads from our api call
        const [ threads, returnedThreads ] = useState('');

        const handleSubmit = async () => {
            console.log('this is where api calls are made')
            setLoading(true)
            console.log(sortSelection)
        //     // call the API with our userInput as a passed-in arg
        //     apiCall('elden').then(response=> {
        //         setLoading(false)
        //         console.log(sortSelection)
        //         // then pass returned response as arg to our postThreads function 
        //         postThreads(response.props.threads.map((results)=>{
        //             if (results.selftext === '') {
        //                 results.selftext = 'N/A'
        //             } 
        //             // declared variable to initialize with a date object using responses return unix timecode
        //             const responseDates = new Date(results.created * 1000)
        //             // because getMonth() returns integers 0 for Jan., 1 for Feb.
        //             // I had to increment values below 10 and add a '0' afterwards
        //             function monthConverter(month) {
        //                 if(month >= 0 && month <= 9){
        //                     let monthToIncrement = month;
        //                     monthToIncrement++;
        //                     const addZero = '0' + monthToIncrement;
        //                     return addZero;
        //                 } else return month;
        //             }
        //             const months = monthConverter(responseDates.getMonth())
        //             // format returned date object into an appropriate string
        //             const createdDate = `${months}/${responseDates.getDate()}/${responseDates.getFullYear()}`
        //         return <GenerateSearch
        //             type={thread} 
        //             subredditName={results.subreddit_name_prefixed} 
        //             author={results.author}
        //             date={createdDate}
        //             threadName={results.title}
        //             body={results.selftext}
        //             awards={results.total_awards_received}
        //             subscriberCount={results.subreddit_subscribers}
        //             url={results.permalink}
        //         />
        //         })
        //     )}
        // )
    }
    
    return ( 
        <div className='page-contents'> 
            <SearchBar onSubmit={ handleSubmit }/>
            {/* Intro page for when the user first loads the site, 
            essentially if no threads are returned from the API, display the fragment below.
            Other wise show the loading animation and return the threads. */}
            <div className='subreddit-container'>
                { !isLoading && threads == '' ? <IntroMessage/> : null }
                { isLoading ? <div className='loading-animation'>
                 <div className='center-animation'><span className="loader-animation"></span></div>
                 </div> : threads }
            </div>
        </div> 
    )
    
    // const doc = new jsPDF()
    // function handleDownload() {
    //     console.log(userInput)    
    //     // doc.text(results, 10, 10)
    //     // doc.save('export.pdf')
    // }
}

export default Page 