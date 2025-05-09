const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const { connectDB } = require("./config");
const { authUser, authmiddleware } = require("./Middlewares");
const User = require("./models/user");


app.post("/sign-up", async (req, res) => {
   
  try{
    // creating a new instance of the user model 
    const  user = new User({
      firstName : "Rohit",
      lastName : "Paul",
      email : " Rohit@gmail.com",
      // password : "Rohit@234",
      age : 24,
    });
   

    await user.save() ;
   res.send("user added successfully");

  } catch(err){
    res.status(400).send(`eror message ${err.message}`);
  }
  


  
   

})





connectDB()
  .then(() => {
    console.log("connection established successfully");
    app.listen(serverConfig.PORT, () => {
      console.log(`Example app listening on port ${serverConfig.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`${err}`);

});
