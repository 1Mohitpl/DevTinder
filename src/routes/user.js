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

    // 1. Pagination setup
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 20 ? 20 : limit;
    const skip = (page - 1) * limit;

    // 2. Get logged-in user's skills
    const currentUser = await User.findById(loggedInUser._id).select("skills");
    const userSkills = currentUser.skills;

    // 3. Get all connections
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

    // 4. Find users to show on feed
    const showFeedUser = await User.find({
      $and: [
        { _id: { $nin: Array.from(notshowUserFeed) } }, // exclude connections
        { _id: { $ne: loggedInUser._id } },              // exclude self
        { skills: { $in: userSkills } }                  // at least one matching skill
      ]
    })
      .select(User_Safe_Data)
      .skip(skip)
      .limit(limit);

    res.send(showFeedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});







module.exports = userRouter;
