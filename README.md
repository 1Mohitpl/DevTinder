# DevTinder 🚀

DevTinder is an MERN stack Web application designd for developer to connect and collaborate each other. Here, user can create their profile,explore others developer profiles, send connections request.

This project built using Nodejs, expressjs and mongoDB, maintain microservices architecture for scalability.

- Before The application configure all the Node moules to start the server and execute the following code :
  ```
  npm install
  ```
- TO Start the server execute the follwing command :
 ```
 npm run start
 ```

Lest take an inside the `src` folder

- `config`-> in the config folder we are setting up all the project configurations or setup of a library or module will be done. for example: setting up `dotenv` folder, so that we can able to use the environment variables at anywhere in the project whenever needed. It is effiecient way to write cleaner code, It is done in the `server-config.js` folder.

- In this folder we also setup our database connection throgh `mongoose`
- firstly, install mongoose to execute the following command:

  ```
  npm install mongoose

  ```
- after that connect database before starting Application on 
  ```
PORT 3000
  ```