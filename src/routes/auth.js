const express = require("express");
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validator = require("validator");
const {validateSignUpData} = require('../utils/validation');

authRouter.post("/signup",async (req,res)=>{

    //validate data
    validateSignUpData(req);
    const {firstName, lastName, emailId, password} = req.body;

    //encrypt the password
    const passwordHash = await bcrypt.hash(password,10);

    const user = new User({
        firstName, lastName, emailId, password:passwordHash
    });
    await user.save();
    res.send("User added successfully");
});

authRouter.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;

    try{
        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid creaditial");
        }

        // const isPasswordVaild = await bcrypt.compare(password, user.password);
        const isPasswordVaild = await user.validatePassword(password);

        if(isPasswordVaild){
            const token = await user.getJWT();

            res.cookie('token',token,{
                expire : new Date(Date.now + 8 * 3600000)
            });
            res.send("Login successfull");
        }else{
            res.send("Invalid crediential");
        }

     }catch(err){
        throw new Error('ERROR: ' + err.message);
    }
});

authRouter.post("/logout", async(req, res)=>{
    res.cookie('token', null, {
        expire : new Date(Date.now)
    });
    res.send('Logout successfully');
});

module.exports = authRouter;