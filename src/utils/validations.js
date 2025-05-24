const validator = require("validator");

const validationSignup  = (req) => {
    
    const {firstName, lastName, emailId, password} = req.body;
    if(!firstName || !lastName){
        throw new Error ("name is Invalid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("please enter a strong Password");
    }
}


const validateProfileData = (req) =>{

    const allowedFeilds = ["firstName", 
   "lastName", 
   "age", 
   "Job_title", 
   "skills"];
  
   const iseditAllowed = object.keys(req.body).every((field) => 
    allowedFeilds.includes(field));
    
   return iseditAllowed;
}


const validateForgetPassword = (req) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new Error("Please enter both current and new passwords");
  }
};


module.exports =  {
     validationSignup,
     validateProfileData,
     validateForgetPassword
}