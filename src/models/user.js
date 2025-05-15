const mongoose = require("mongoose");
const validator = require("validator");

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
        return val.length >= 2 && val.length <= 4;
      },
      message: 'You must provide between 2 and 4 skills.'
    }
  }




}, {
  timestamps : true,
});

const User = mongoose.model("User", UserSchema);

module.exports  = User;