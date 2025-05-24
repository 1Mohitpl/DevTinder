const express = require("express");
const { authUser } = require("../Middlewares");
const { validateProfileData, validateForgetPassword } = require("../utils");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");


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


profileRouter.patch("/profile/password", authUser, async (req, res) => {
  try {
    // Validate input
    validateForgetPassword(req); // ✅ Call the function

    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    // Validate current password
    const isPasswordValid = await user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid current password");
    }

    // Hash new password and update
    const newHashPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashPassword;

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(400).send(`Error message: ${err.message}`);
  }
});


module.exports = profileRouter;