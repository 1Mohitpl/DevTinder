const express = require('express')
const app = express()
const port = 3000;
const {authmiddleware, authUser} = require("./Middlewares/auth");

app.use("/admin", authmiddleware);

app.get("/admin/getuserdata", (req, res) => {
  // logic of checking if the request is autharized
    res.send("get all the user data");
})
 
app.get("/userdata", authUser, (req, res) => {
     res.send(" Get all the user data");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 