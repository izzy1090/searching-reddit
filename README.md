# searching-reddit

If you would like to use the search engine via the web, please visit the below URL, enter keyword(s) into the search bar at the top and press 'enter' / 'return':

https://searchingreddit.vercel.app/

To use the program via Node JS, create a folder in your desired directory where the repo will live locally and clone the main branch into that main directory. 

Create a separate .env file within the JS folder and use the .env_sample to format your .env file. 

Go to the below URL and use your Reddit account to create an app. Write your desired app title (this does not affect functionality, so use whatever you want), app description, choose "script" for personal use, and enter in your desired redirect URL.

https://ssl.reddit.com/prefs/apps/

Then add the generated API Key and API Secret as well as include your Reddit username / password to the .env file created earlier. 

Finally run: 
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

1) Search button with color change upon click to indicate to the user a search is being made

2) Allow user to remove or hide threads from the web page after the user is done reading

3) Export or download Reddit threads as a PDF via the UI to the user's desktop computer

4) Make calls to different endpoints from Reddit's API allowing a user to search for Subreddits
