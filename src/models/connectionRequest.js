const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status : {
        type : String,
        required : true,
        enum :{
            values : ["ignored","interested","accepeted","rejected"],
            message : `{value} is incorrect status type`,
        }
    }
},{
    timestamps : true
});

connectionRequestSchema.pre("save",function(next){
    const connctionRequest = this;
    //check if fromUserId is same as toUserId
    if(connctionRequest.fromUserId.equals(connctionRequest.toUserId)){
        throw new Error("cannot send connection request to your self");
    }
    next();
})

const connectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
);

module.exports = connectionRequestModel;