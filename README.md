# searching-through-sub-reddits

To use the program via Node JS, create a folder in your desired directory where the repo will live locally and clone the main branch in that directory. 

Create a separate .env file and use the .env_sample to format your .env file. 

Go to the below URL and use your reddit account to create an app. Write your desired app title, app description, choose "script" for personal use, and enter in your desired redirect URL.
https://ssl.reddit.com/prefs/apps/

Add generated API Key and API Secret from creating an app via the link above as well as include your Reddit credentials to the .env file created earlier using the .env_sample as a template. 

Finally run: 
```
npm install
```

You should be good to go! 

Real quick, before you run your first search. 

Currently you need to enter search parameters into a function userInput on userInput.js file. The function accepts three arguments: search term (string), number of results (you cap at 100 threads), and how you want your results sorted (relevance, hot, top, new, comments, old).

CLI commands for various features: 
// runs the program to generate a search
```
node searchAllOfReddit-node.js
```

// cleans up your file directory (note: use this script BEFORE changing search parameters to keep results organized)
```
node cleanDirectory.js
```

A cleaner README is intended for the future.
