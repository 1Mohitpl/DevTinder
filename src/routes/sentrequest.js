const express = require("express");
const { authUser } = require("../Middlewares");
const requestRouter = express.Router();


requestRouter.post("/sendconnectionReq",  authUser,   async (req, res) => {
     
  try{
   

    res.status(200).send("sent the connection request");

  } catch(err) {
     res.status(400).send(`Error message : ${err}`);
  }
    

});

module.exports = requestRouter;
