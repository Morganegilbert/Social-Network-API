# social-network-api
## Social network database utilizing Mongoose and Express to create a working database to create, update, and delete Users and Thoughts. Also add and delete friends and reactions.
<br>

### To initialize, run the following commands:
* npm i
* npm install express
* npm install moment
#### To start the server, run npm start.

### Once the server has started, you can utilize the below commands:

### Find all (GET):
* You can use the GET route to pull Users or Thoughts

### Find one (GET):
* You can use the GET route to pull information on one User or Thought through utilizing the associated ID

### Add/Create  (POST):
* You can use the POST route to add a User, Thought, Friend, or Reaction. (The Friend and Reaction will utilize the User and Thought IDs respectively)

### Delete/Remove (DEL):
* You can use the DEL route to remove a specifc User, Thought, Friend, or Reaction by utilizing the id

### Update (PUT):
* You can use the PUT route to update specific information under User or Thought by utilizing the id (ex. change the name of a category)
<br>

### This project utilizes mongoose, express, and moment.
#### The schema will need to be sourced in mysql prior to running npm start. The seeds will also need to be activated by npm run seed.

## URL Links:
<br>
## Social Network API Video: 
