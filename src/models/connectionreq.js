const mongoose = require("mongoose");

const connectionReqSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },

  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "interested", "rejected", "accepted"],
      message: `{values} is incorrect status type`,
    },
  },
}, {
    timestamps : true
});

connectionReqSchema.index({fromUserId:1, toUserId:1})

connectionReqSchema.pre("save", function(next){
    const connectionreq = this;
    if(connectionreq.fromUserId.equals(connectionreq.toUserId)){
       throw new Error ("cannot send connection request to yourself")
    }
    next();
})

const connectionRequestModel=  new mongoose.model("connectionreuest", connectionReqSchema);
module.exports = connectionRequestModel;