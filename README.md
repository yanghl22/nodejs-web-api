# nodejs-web-api

For any application with a need to build its own social network, "Friends Management" is a common requirement which usually starts off simple but can grow in complexity depending on the application's use case.  Usually, applications would start with features like "Friend", "Unfriend", "Block", "Receive Updates" etc.

RESTful applications use HTTP requests to perform four operations termed as CRUD (C: create, R: read, U: update, and D: delete). Create and/or update is used to post data, get for reading/listing data, and delete to remove data.

RESTful is composed of methods such as; base URL, URL, media types, etc.

### Technology:

In this exercise, I will create a RESTful API using Node.js and MongoDB.

Install Node.js:

Run "npm -v" in your terminal to check the version of NPM installed on your machine. If not stalled, click  [here](https://nodejs.org/en/download/current/)to install Node.js.

Install MongoDB:

Run "mongo --version" in your terminal to check the version of and MongoDB. If not stalled, click  [here](https://docs.mongodb.com/manual/installation/)to install MongoDB.

### Steps to setup nodejs-user-api project:

* Create a folder name nodejs-user-api.

* Navigate to nodejs-user-api and run "npm init". This command will create a package.json file which contains necessary information to npm and dependencies. Package.json will looks like below enventually.

![alt package.json](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/package.png "package.json")

* Create a "server.js" file in the rooter.

* Create a "api" folder in the rooter, create 3 more subfolder "api/controllers" "api/models" "api/routes".

* Create following files, "api/controllers/userController.js" "api/models/userModel.js" "api/routes/userRoute.js"

The project structure will look like below.

![alt project structure](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/project-structure.png "project structure")


### Server setup:

Install express, nodmon and mongoose.

    npm install --save-dev nodemon

    npm install express --save

    npm install mongoose --save

Express will be used to create the server.
Nodmon will track the changes of our application by watching changed files and automatically restart the server.
Mongoose is to interact with a MongoDB instance.

![alt server file](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/server.png "server file")


### Routes setup:

Add below routes to userRoute.js base on below user stories.

![alt Routes](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/user-routes.png "Routes")


### Data Schema(Users):

Define user schema as below:

![alt User Schema](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/user-schema.png "User Schema")


### Start the server

Run "npm run start" on your terminal, which will start the server.

### Insert seeds to Mongo

* Open terminal and run "mongo" to go to mongo shell.

* run below commands to insert seeds to mongodb.

`use usersdb`


`db.users.insertMany([{email:"andy@example.com", name:"andy",profession:"project manager",friends:[],followed:[],create_date:new Timestamp(),updated_date:new Timestamp()},{email:"john@example.com", name:"john",profession:"business analyst",friends:[],followed:[],create_date:new Timestamp(),updated_date:new Timestamp()},{email:"bill@example.com", name:"bill",profession:"team leader",friends:[],followed:[],create_date:new Timestamp(),updated_date:new Timestamp()},{email:"jack@example.com", name:"jack",profession:"qa",friends:[],followed:[],create_date:new Timestamp(),updated_date:new Timestamp()},{email:"yanghl22@gmail.com", name:"honglin",profession:"full-stack developer",friends:[],followed:[],create_date:new Timestamp(),updated_date:new Timestamp()}])`


### User Stories

* As a user, I need an API to create a friend connection between two email addresses.

    The API should receive the following JSON request:

    {
      friends:
        [
          'andy@example.com',
          'john@example.com'
        ]
    }
    The API should return the following JSON response on success:

    {
      "success": true
    }
    Please propose JSON responses for any errors that might occur.

#### Implementation

![alt add friend](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/add-friend1.png "add friend")
![alt add friend](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/add-friend2.png "add friend")


#### Output

![alt output](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/add-friend.png  "output")





* As a user, I need an API to retrieve the friends list for an email address.

    The API should receive the following JSON request:

    {
      email: 'andy@example.com'
    }
    The API should return the following JSON response on success:

    {
      "success": true,
      "friends" :
        [
          'john@example.com'
        ],
      "count" : 1   
    }
    Please propose JSON responses for any errors that might occur.


#### Implementation

![alt get friend list](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/get-friend-list.png "get friend list")

#### Output

![alt output](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/get-friends.png "output")






* As a user, I need an API to retrieve the common friends list between two email addresses.

    The API should receive the following JSON request:

    {
      friends:
        [
          'andy@example.com',
          'john@example.com'
        ]
    }
    The API should return the following JSON response on success:

    {
      "success": true,
      "friends" :
        [
          'common@example.com'
        ],
      "count" : 1   
    }
    Please propose JSON responses for any errors that might occur.


#### Implementation

![alt get common friend list](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/get-common-friends.png "get common friend list")

#### Output

![alt output](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/common-friend.png "output")







* As a user, I need an API to subscribe to updates from an email address.

Please note that "subscribing to updates" is NOT equivalent to "adding a friend connection".

The API should receive the following JSON request:

{
  "requestor": "lisa@example.com",
  "target": "john@example.com"
}
The API should return the following JSON response on success:

{
  "success": true
}
Please propose JSON responses for any errors that might occur.


#### Implementation

![alt follow user](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/follow-user.png "follow user")

#### Output

![alt output](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/follow-user-output.png "output")






* As a user, I need an API to block updates from an email address.

    Suppose "andy@example.com" blocks "john@example.com":

    if they are connected as friends, then "andy" will no longer receive notifications from "john"
    if they are not connected as friends, then no new friends connection can be added
    The API should receive the following JSON request:

    {
      "requestor": "andy@example.com",
      "target": "john@example.com"
    }
    The API should return the following JSON response on success:

    {
      "success": true
    }
    Please propose JSON responses for any errors that might occur.


#### Implementation

![alt unfollow user](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/unfollow-user.png "unfollow user")


#### Output

![alt output](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/unfollow-user-output.png "unfollow user output")





* As a user, I need an API to retrieve all email addresses that can receive updates from an email address.

    Eligibility for receiving updates from i.e. "john@example.com":

    has not blocked updates from "john@example.com", and
    at least one of the following:
    has a friend connection with "john@example.com"
    has subscribed to updates from "john@example.com"
    has been @mentioned in the update
    The API should receive the following JSON request:

    {
      "sender":  "john@example.com",
      "text": "Hello World! kate@example.com"
    }
    The API should return the following JSON response on success:

    {
      "success": true
      "recipients":
        [
          "lisa@example.com",
          "kate@example.com"
        ]
    }
    Please propose JSON responses for any errors that might occur.

#### Implementation

![alt get followers](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/follow-user.png "get followers")

#### Output

![alt output](https://github.com/yanghl22/nodejs-web-api/blob/master/static/images/get-followers-output.png "output")





# TODOLIST

The exception handling is not well done yet, later I will refine the exception handling and write tests for each webapi. In addition, I will create a front-end application use angular to consume the webapi.
