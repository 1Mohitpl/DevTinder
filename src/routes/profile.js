const express = require("express");
const { authUser } = require("../Middlewares");
const { validateProfileData } = require("../utils");
const profileRouter = express.Router();



profileRouter.get("/profile/view", authUser,  async (req, res) => {
   try{
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`Error message: ${err}`);
  }


})


profileRouter.patch("/profile/edit", authUser, async (req, res) => {
     try{
      if(!validateProfileData){
        throw new Error ("Invalid Edit request");
      }
      
      const loggedInUser = req.user;
   
      Object.keys(req.body).forEach((key) => {
          (loggedInUser[key] = req.body[key]);
      })


      await loggedInUser.save();
      res.json({ message : `${loggedInUser.firstName}, your profile is edited successfully...`,
         data :loggedInUser
      })

     } catch(err) {
         res.status(400).send(`Error message: ${err}`);
     }
})



module.exports = profileRouter;