const express = require("express");
const app = express();
const { serverConfig } = require("./config");
const { connectDB } = require("./config");
const User = require("./models/user");
const cookieParser = require('cookie-parser');
const { authRouter, profileRouter, requestRouter } = require("./routes");


app.use(express.json());

app.use(cookieParser());



app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
















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
