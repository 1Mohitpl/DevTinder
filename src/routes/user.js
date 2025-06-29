const express = require("express");
const { authUser } = require("../Middlewares");
const connectionRequestModel = require("../models/connectionreq");
const { set } = require("mongoose");
const User = require("../models/user");
const userRouter = express.Router();
const User_Safe_Data = "firstName lastName";

// get all the connection sent user for the loggedIn user

userRouter.get("/user/Sending/Requests", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data is successfully fetched",
      data: connectionRequest,
    });
  } catch (err) {
    req.statusCode(400).send(`message : ${err}`);
  }
});

userRouter.get("/user/connections", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const allConnections = await connectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    }).populate("fromUserId", User_Safe_Data);

    const Data = allConnections.map((row) => row.fromUserId);

    res.json({Data});
  } catch (err) {
    res.status(400).send(`message : ${err}`);
  }
});




userRouter.get("/user/feed", authUser, async (req, res) => {
  try {
    const loggedInUser = req.user;

    // Find all the user's connections
    const connections = await connectionRequestModel.find({
      $or: [
        { fromUserId: loggedInUser._id },
        { toUserId: loggedInUser._id },
      ]
    }).select("fromUserId toUserId");

    const notshowUserFeed = new Set();

    connections.forEach((conn) => {
      notshowUserFeed.add(conn.fromUserId.toString());
      notshowUserFeed.add(conn.toUserId.toString());
    });

    // console.log(notshowUserFeed);

    const showFeedUser = await User.find({
      $and : [
        {_id : {$nin: Array.from(notshowUserFeed)}},
        {_id: {$ne: loggedInUser._id}},
      ]
    }).select(User_Safe_Data);

    res.send(showFeedUser);

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: `${err}` });
  }
});






module.exports = userRouter;
