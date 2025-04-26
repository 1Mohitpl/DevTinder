const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const { connectDB } = require("./config");
const { authUser, authmiddleware } = require("./Middlewares");

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
