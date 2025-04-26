const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

    firstName :{
        type : String,
        required : true,
    },

    lastName : {
        type : String,
        required : true,
    },

    email : {
        type: String,
        required:true,
        unique: true,
   
      },
      Job_title:{
        type: String
      },
   
      gender:{
        type: String
      },

      age : {
        type : Number,
        required : true,
      },




});

const User = mongoose.model("User", UserSchema);

module.exports  = User;