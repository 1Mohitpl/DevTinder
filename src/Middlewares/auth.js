const authmiddleware = (req, res, next) => {

    console.log("check adminAuth");
    const token = "xyz";
    const isadminautharized = token === "xyz";
    if(!isadminautharized){
      res.status(401).send("unauthorized")
    }else{
      next();
    }
}



const authUser = (req, res, next) => {
    console.log("check user auth")
    const token = "abc";
    const isadminautharized = token === "abc";
    if(!isadminautharized){
      res.status(401).send("unauthorized")
    }else{
      next();
    }
     
}
module.exports = {authmiddleware, authUser};