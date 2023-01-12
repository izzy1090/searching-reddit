export function IntroMessage(){
    return(
        <>
            <div className='subreddits-container' id='landing-page'>
                <p><strong>Note From Developer:</strong></p><br></br>
                <p>Hello and welcome to my Reddit search engine!</p><br></br>
                <p>Currently you can use the search bar above to enter keyword(s) to generate threads returned from Reddit's API.</p><br></br>
                <p>The purpose of this project was to utilize Reddit's API to generate results 
                    and dynamically render posts for the user. The website uses JavaScript, 
                    CSS, React/JSX and Next.js as a framework.</p><br></br>

                <p>If you would like to use this program via Node.js to
                download them locally, please visit the GitHub linked below and follow the directions via the ReadMe to use it with your preferred IDE.</p><br></br>

                <a href='https://github.com/izzy1090/searching-through-sub-reddits' target={'_blank'}>GitHub Repository</a>
                <br></br><br></br>
                
                <p><strong>Planned features include:</strong></p>
                <ul className='thread-sizing'>
                    <li>1) Need to stylize button and add a click animation to show a search is being made</li><br></br>
                    <li>2) Allow user to remove or hide threads from the web page after the user is done reading</li><br></br>
                    <li>3) Export or download Reddit threads as a PDF via the UI to the user's desktop computer</li><br></br>
                    <li>4) Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits</li><br></br>
                    <li>5) Back button to allow the user to navigate back to the homepage</li><br></br>
                    <li>6) Display the first 10 threads and as the user scrolls down the page, additional results display</li><br></br>
                </ul>
            </div>
        </>
    )
}

export default IntroMessage