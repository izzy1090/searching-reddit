# searching-through-sub-reddits

To use program, create a folder in your desired directory where the repo will live locally, then clone the repo in that directory. 

Create a separate .env file and use the .env_sample to format the file. 

Go to the below URL and use your reddit account to create an app. Write your desired app title, app description, choose "script" for personal use, and enter in your desired redirect URL.
https://ssl.reddit.com/prefs/apps/

Add your API Key and API Secret to the .env file you created using the .env_sample as a template. 

Finally install the following npm dependencies:

'fs'
npm install fs

'node-fetch' - to use fetch with earlier versions of node
npm install node-fetch

'dotenv'
npm install dotenv

After that, should be good to go! A cleaner README is intended for the future.
