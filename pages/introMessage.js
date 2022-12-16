export function introMessage(){
    return(
        <>
        <div className="page-contents">
                    <div className='subreddits-container' id='landing-page'>
                        <p><strong>Note From The Developer:</strong></p>
                        <p>Hello and welcome to my Reddit search engine!</p><br></br>
                        <p>Currently you can use the search bar above to enter keyword(s) to generate threads returned from Reddit's API.</p><br></br>
                        <p>The purpose of this project was for me to learn how to interact with Reddit's API to generate results 
                            and dynamically render posts for a user. The program uses <b> JavaScript</b> for functionality, 
                            <b> CSS</b> for styling, <b> React JS</b> for the user interface and <b> Next JS</b> (web dev framework) to act as the linchpin.</p><br></br>
                        <p>Next JS allows JavaScript to make calls to Reddit's API which then dynamically render the response for a user each call.</p><br></br> 

                        <p>If you would like to use this program via <b> Node JS</b> to schedule recurring searches 
                        and download them please visit the GitHub linked below and follow the directions for the ReadMe to use it with your preferred IDE.</p><br></br>

                        <a href='https://github.com/izzy1090/searching-through-sub-reddits' target={'_blank'}>GitHub Repository</a>
                        <br></br><br></br>
                        
                        <p>Planned features include:</p>
                        <ul className='thread-sizing'>
                            <li>1) Search button with color change upon click to indicate to the user a search is being made</li><br></br>
                            <li>2) A loading state to let the user know a search is being made</li><br></br>
                            <li>3) Allow user to remove or hide threads from the web page after the user is done reading</li><br></br>
                            <li>4) Export or download Reddit threads as a PDF to the user's desktop computer</li><br></br>
                            <li>5) Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits</li>
                        </ul>
                    </div>
        </div>
        </>
    )
}

export default introMessage