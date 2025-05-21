const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const { connectDB } = require("./config");
const { authUser } = require("./Middlewares");
const User = require("./models/user");
const { validationSignup } = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')


app.use(express.json());

app.use(cookieParser());

app.post("/sign-up", async (req, res) => {

   try {
         // validate the data
      validationSignup(req);

      // now encrypt password
      const {firstName, lastName, age, Job_title, email,password} = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
    
      

  // creating a new instance of the user model
  const user = new User({
    firstName,
    lastName,
    email,
    age,
    Job_title,
    password : hashPassword,

  }); // data dynamic


 
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send(`eror message ${err.message}`);
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userPresent = await User.findOne({ email: email });

    if (!userPresent) {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

    const isPasswordValid = await userPresent.validatePassword(password);

    if (isPasswordValid) {

     
    // Create JWT token
      const token = await userPresent.getJWT();

    // and the token to cookie and send the responce back to the user

    res.cookie("token", token, {
        expires : new Date(Date.now() + 8 * 3600000)
    });
    
    res.status(200).send("Login is successful...");
    } else {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

  } catch (err) {
    res.status(400).send(`error message: ${err.message}`);
  }
});



app.get("/profile", authUser,  async (req, res) => {
   try{
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`Error message: ${err}`);
  }


})


app.post("/sendconnectionReq",  authUser,   async (req, res) => {
     
  try{
   

    res.status(200).send("sent the connection request");

  } catch(err) {
     res.status(400).send(`Error message : ${err}`);
  }
    

})










app.get("/feed", async (req, res) => {
  try {
    const allUser = await User.find();
    return res.json(allUser);
  } catch (eror) {
    res.status(500).json({ error: "Unable to retrieve data" });
  }
});







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
