# DevTinder 🚀

## Overview

DevTinder is an MERN stack Web application designd for developer to connect and collaborate each other. Here, user can create their profile,explore others developer profiles, send connections request.

This project built using Nodejs, expressjs and mongoDB, maintain microservices architecture for scalability.

## 🔗Tech Stack
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens) + Cookies
- **Package Maneger** NPM
- **API Testing** Postman
- **Encryption**: bcryptjs

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
- Inside the `Models` folder we are creating our schema of User database, once schema is created based on that schema you can save documents to mongoDB based on that schema. MongoDB provides `save()` methode to save data with propder validation.

`models`-> in this file, we created the template of the database schema 


- `Middlewares` In this folder we are basically build user Authentication feather, whenever user try to loggin, it `JWT` token is created keep inside the `Cookies` in the server and send back to the Client-side. Now, whenever the user made API call, the cookies will be validated.

- `routes` in this folder, we are creating the all the Router-handler
```
authRouter, profileRouter, sentrequestRouter

```

