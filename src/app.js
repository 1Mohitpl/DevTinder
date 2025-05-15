const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const { connectDB } = require("./config");
const { authUser, authmiddleware } = require("./Middlewares");
const User = require("./models/user");

app.use(express.json());

app.post("/sign-up", async (req, res) => {
  // creating a new instance of the user model
  const user = new User(req.body); // data dynamic

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send(`eror message ${err.message}`);
  }
});



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
