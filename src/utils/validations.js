const validator = require("validator");

const validationSignup  = (req) => {
    
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error ("name is Invalid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter a strong Password");
    }
}

module.exports =  {
     validationSignup
}