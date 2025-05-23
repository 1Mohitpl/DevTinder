const express = require("express");
const { authUser } = require("../Middlewares");
const profileRouter = express.Router();



profileRouter.get("/profile", authUser,  async (req, res) => {
   try{
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send(`Error message: ${err}`);
  }


})

module.exports = profileRouter;