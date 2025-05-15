const mongoose = require("mongoose");

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
        trim : true
   
      },
      Job_title:{
        type: String
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