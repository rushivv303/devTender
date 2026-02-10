const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');

profileRouter.get('/profile/view',userAuth, async(req,res)=>{
    try{
       const user = req.user

        res.send(user);
    }catch(err){
        throw new Error("ERROR: "+err.message);
    }
});

profileRouter.patch('/profile/edit', userAuth, async(req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user;

        await loggedInUser.save();

        res.json({message:`${loggedInUser.firstName}, your profile upadetd successfully.`, data:loggedInUser});

    }catch(err){
        throw new Error("ERROR:" + err.message);
    }
});

profileRouter.patch('/profile/forgetPassword',async(req,res)=>{
    

    
})

module.exports = profileRouter;

