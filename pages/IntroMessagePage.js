function IntroMessagePage({threads, loading}) {

    const showPage = threads && !loading; 
    
    if (showPage && threads.length === 0){
        return (
        <div className="subreddit-container text-sm">
            <p className="font-semibold p-1">
                Note From Developer:
            </p>
            <p className="p-1">
                Hello and welcome to my Reddit search engine!
            </p>
            <p className="p-1">
                Use the search bar above to enter keyword(s) to search for relevant threads from Reddit. 
                You can also use the sort dropdown menu on the right to filter your results accordingly.
            </p>
            <p className="p-1">
                The purpose of this project was to utilize Reddit's API to generate results 
                and dynamically render posts for the user. The website uses JavaScript, 
                CSS, React/JSX and Next.js as a framework.
            </p>
            <p className="p-1">
                If you would like to use this program via Node.js to
                download them locally, please visit the GitHub linked below and follow 
                the directions via the ReadMe to use it with your preferred IDE.
            </p>
            <div className="text-blue-500 p-1">
                <a target='_blank'
                    rel="noreferrer"
                    href='https://github.com/izzy1090/searching-reddit'>
                    <span className="hover:underline">GitHub Repository</span>
                </a>
            </div>
            
            <p className="font-semibold p-1">
                Planned features include:
            </p>
            <ul className='thread-sizing'>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">1)</span>Need to squash bug where the thread count number is changed by NSFW content being filtered out. 
                </li>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">2)</span>Need to convert subscriber numbers into a better number format (i.e. 1,500 subs = 1.5k subs) 
                </li>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">3)</span>Display the first 10 threads and as the user scrolls down the page, additional results display
                </li>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">4)</span>Export or download Reddit threads as a PDF via the UI to the user's desktop computer
                </li>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">5)</span>Add a date range filter so user's can filter through returned results using a date range
                </li>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">6)</span>Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits
                </li>
                <li className="flex flex-row mb-1">
                    <span className="block pr-1">7)</span>Back button to allow the user to navigate back to the homepage
                </li>
            </ul>
        </div>
        ) 
    } else return null;
}


export default IntroMessagePage;