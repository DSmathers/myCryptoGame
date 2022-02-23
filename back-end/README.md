# My Crypto App Server

## Note 

You might be wondering why I would use Firebase for Auth but not their noSQL database solutons which integrate so nicely. I've thought about this a considerable amount but ultimately decided to go with MongoDB despite the additional, unneccesarry, complexity since it gives me the opportunity to learn a more universal skillset than just Firebase methods. 

# Some info for potential cloners

First off, I will definitely get around to making this nicer with more detailed instructions eventually. At least I plan to. For now just some important notes to help you get on your way. 

- cd into /back-end
- Install dependencies using `npm i --save`
- Create a .env file and don't forget to add to .gitignore if neccessary
- Set up and/or create a mongodb database and add the URL as an enviroment variable called "DB_CONNECTION_URL"
- Add another variable called "PORT" and assign to whichever port your server will be running on. 
- Set up a Firebase auth account and follow instructions found [here](https://firebase.google.com/docs/admin/setup) to set up the admin SDK on your server. 
- Create a file named "authKey.json" and save your key. Don't forget to double check your .gitignore. 
- run `npm start` to start dev server