const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config/server-config");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({

    firstName :{
        type : String,
        required : true,
        minLength : 4,
        maxLength : 50,
    },

    lastName : {
        type : String,
        required : true,
    },

    email : {
        type: String,
        required:true,
        unique: true,
        lowercase : true,
        trim : true,
        validate(value) {
          if(!validator.isEmail(value)){
            throw new Error("invalid email address :" + value);
          }
        }
   
      },
      Job_title:{
        type: String,
        required:true,
      },
   
      gender:{
        type: String,
        validate(value) {
          if(!["male", "female", "others"].includes(value)){
            throw new Error("Gender is not valid")
          }
        }
      },
      
      password : {
        type : String,
        required : true,
        unique : true,
        validate(value) {
        if(!validator.isStrongPassword(value)){
          throw new Error("your password is not strong :" + value);
        }
      }
        
      },
      
    age : {
        type : Number,
        required : true,
        min : 18,
      },

    skills: {
    type: [String],
    validate: {
      validator: function (val) {
        return val.length >= 2 || val.length <= 4;
      },
      message: 'You must provide between 2 and 4 skills.'
    }
  }




}, {
  timestamps : true,
});

UserSchema.methods.getJWT =  async function () {

  const user = this;
  const token = await jwt.sign({_id: user._id},  JWT_KEY, {
           expiresIn : "7d"
      });
return token;

}

UserSchema.methods.validatePassword = async function (passwordbyInput) {
     const user = this;
     const passwordHash = user.password;

    
     const isPasswordValid = await bcrypt.compare(passwordbyInput, passwordHash);

     return isPasswordValid;
}



const User = mongoose.model("User", UserSchema);

module.exports  = User;