const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const { connectDB } = require("./config");
const { authUser, authmiddleware } = require("./Middlewares");
const User = require("./models/user");
const { validationSignup } = require("./utils/validations");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");

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

    const isPasswordValid = await bcrypt.compare(password, userPresent.password);

    if (isPasswordValid) {

     
    // Create JWT token
      const token = await jwt.sign({_id: userPresent._id},  "DEvTinder@2001");

    // and the token to cookie and send the responce back to the user

    res.cookie("token", token);
    
    res.status(200).send("Login is successful...");
    } else {
      return res.status(400).send({ message: "Invalid Credentials" });
    }

  } catch (err) {
    res.status(400).send(`error message: ${err.message}`);
  }
});



app.get("/profile", async (req, res) => {
   
  try{
    const cookies = req.cookies;
    const {token} = cookies;
    if(!token){
      throw new Error("invalid token");
    }

    const verifyUser = await jwt.verify(token,  "DEvTinder@2001");
    
    const {_id} = verifyUser;
    // find the user by the token
    const user = await User.findById(_id);
    if(!user){
      throw new Error ("user does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send(`Error message: ${err}`);
  }


})






// get the user by emailId
app.get("/email", async (req, res) => {
  try{
   const person = await User.find({email : req.body.email});
   if(person.length === 0){
       return res.status(404).send("User not found");
   } else {
       return res.json(person)  
   }
    
  } catch (err){
     return  res.status(400).send(`message : ${err.message}`);
  }
     

})

// Get the user by age

app.get("/age", async (req, res) => {
     
  const userbyAge = req.body.age;
  try{
    const user = await User.find({age : userbyAge});
    if(userbyAge >=18){
      return res.send(user);
    } else {
       res.status(404).send("User not found");
    }
  } catch(err){
     res.status(400).send(`message : ${err}`);
  }

})

// delete the user by userid

app.delete("/delete", async (req, res) => {
    const userId = req.body.userId;
    try{
       const user = await User.findByIdAndDelete(userId);
       res.send("user delete successfully");
    } catch (err) {
        res.status(400).send(`message : ${err}`);
    }
})

// update the user by the userid

app.patch("/update/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;
    
 
 
  try {


     const Allowed_Updates = [
    "age", "gender", "Job_title", "password", "skills", "userId", "email"
  ]


  const isUpdateAllowed = Object.keys(data).every(k => Allowed_Updates.includes(k));

  if(!isUpdateAllowed) {
    throw new Error("update is not allowed");
  }
     await User.findByIdAndUpdate({_id : userId}, data,{
      returnDocument :"after",
        runValidators : true,
     });
     res.send("user update successfully");

    } catch (err) {
        res.status(400).send(` message :  ${err}`);
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
