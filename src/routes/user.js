const express = require("express");
const { authUser } = require("../Middlewares");
const connectionRequestModel = require("../models/connectionreq");
const userRouter = express.Router();


// get all the connection sent user for the loggedIn user

userRouter.get("/user/Sending/Requests", authUser, async (req, res) => {
    try{
         const loggedInUser = req.user;

         const connectionRequest = await connectionRequestModel.find({
            toUserId: loggedInUser._id,
            status : "interested",
         }).populate("fromUserId", ["firstName", "lastName"]);

         res.json({
            message : "Data is successfully fetched",
            data : connectionRequest,
         })

    } catch(err) {
        req.statusCode(400).send(`message : ${err}`);
    }
})

module.exports = userRouter;