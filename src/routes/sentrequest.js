const express = require("express");
const { authUser } = require("../Middlewares");
const connectionRequestUser = require("../models/connectionreq");
const User = require("../models/user");
const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId",  authUser,   async (req, res) => {
     
  try{
   
    // get the user who sent request
    const fromUserId = req.user._id;
    // get the user who recive request
    const toUserId = req.params.toUserId;
    const status = req.params.status

    // validate  the status 
    const allowedStatus = ["ignored", "interested"];
    if(!allowedStatus.includes(status)){
         return res 
         .status(400)
         .json({message : "Invalid status type..."})
    }
     
    const touser = await User.findById(toUserId);
    if(!touser){
       return res.status(404).json({message : "user is not found"});
    }
    // to validate user not sent yourself and do not sent request double 
    const existConnetionReq = await connectionRequestUser.findOne({
        $or:[
          {fromUserId, toUserId},
          {fromUserId : toUserId, toUserId : fromUserId}
        ]
    })
    
    if(existConnetionReq){
      throw new Error ("connection is already exit...")
    }

    // now createing new connection instence 
    const connectionSentUser = new connectionRequestUser({
          fromUserId,
          toUserId,
          status
    })

    const userData = await connectionSentUser.save();

    // Dynamic response message
    const actionVerb = status === "interested" ? "is interested in" : "ignored";
    const message = `${req.user.firstName} ${actionVerb} ${touser.firstName}`;

    res.json({
      message,
      userData
    });







  } catch(err) { 
     res.status(400).send(`Error message : ${err.message}`);
  }
    

});

module.exports = requestRouter;
