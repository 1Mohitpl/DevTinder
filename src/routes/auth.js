const express = require("express");
const { validationSignup } = require("../utils/validations");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const authRouter = express.Router();



authRouter.post("/sign-up", async (req, res) => {

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


authRouter.post("/login", async (req, res) => {
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


module.exports = authRouter;