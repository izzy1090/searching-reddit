# searching-reddit

Hello and welcome to my Reddit search engine!

Currently you can use the search bar above to enter keyword(s) to generate threads returned from Reddit's API.

The website uses JavaScript, CSS, React/JSX and Next.js as a framework.

If you would like to use the search engine, please visit the below URL, enter keyword(s) into the search bar at the top and press 'enter' / 'return' or the magnifying glass on the right (i.e. the search button):

https://searchingreddit.vercel.app/

However if you would like to use the program via Node.js, create a folder in your desired directory where the repo will live locally and clone the main branch into that directory. 

Create a separate .env file within the JS folder and use the .env_sample to format your .env file. 

Go to the below URL and use your Reddit account to create an app. Write your desired app title (this does not affect functionality, so use whatever title you want), an app description, choose "script" for personal use, and enter in your desired redirect URL (this can be anything).

https://ssl.reddit.com/prefs/apps/

Then add the generated API Key and API Secret as well as include your Reddit username / password to the .env file created earlier. 

Finally run to install all the required dependencies: 
```
npm install
```

Current CLI commands:

Executes the program to perform a search:
```
node searchAllOfReddit-node.js
```

Cleans the your file directory (note: use this script BEFORE changing search parameters to keep results organized):
```
node cleanDirectory.js
```

Planned features include:

1) Export or download Reddit threads as a PDF via the UI to the user's desktop computer

2) Add a date range filter so user's can filter through returned results using a date range

3) Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits

4) Back button to allow the user to navigate back to the homepage

5) Display the first 10 threads and as the user scrolls down the page, additional results display

t
