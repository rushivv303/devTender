const express = require("express");
const userRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');

userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId","firstName lastName"/* [firstName, lastName] */);

        console.log(connectionRequest);

        res.json({
            message:"data fetch successfully",
            data : connectionRequest
        });
    }catch(err){
        res.status(400).send("ERROR:" + err.message);
    }
});

userRouter.get("/user/requests/connection",userAuth,async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate("fromUserId", "firstName lastName").populate("toUserId", "firstName lastName");

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId.id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({data});
    }catch(err){
        return res.status(400).send("ERROR:" + err.message);
    }
});

userRouter.get("/feed", userAuth, async(req,res)=>{
    try{
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        
        const skip = (page - 1)*limit;
    
        const connectionRequests = await ConnectionRequest.find({
            $or:[{toUserId: loggedInUser._id},{fromUserId: loggedInuser._id}]
        }).select("fromUserId toUserId");
    
        const hideUsersFromFeed = new Set();
    
        connectionRequests.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });
    
        const users = await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne : loggedInUser._id}}
            ]
        }).select("firstName lastName skills").skip(skip).limit(limit);
    
        res.json({data:users});
    }catch(err){
        res.send(400).send("ERROR:" + err.message);
    }
});

module.exports = userRouter;
