const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authUser = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;

    // now check, token is present or not
    if (!token) {
      throw new Error("token is not valid");
    }

    // validate the token
    const checkUser = await jwt.verify(token, "DEvTinder@2001");

    const { _id } = checkUser;

    // find the user id from cookies

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User is not found");
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send(`Error message : ${err}`);
  }
};
module.exports = { authUser };
