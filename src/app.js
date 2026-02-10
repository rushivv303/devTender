const express = require("express");
const connectDB = require('./config/database')
const app = express();
// const User = require('./models/user');
const validator = require("validator");
// const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
// const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter); 

// app.use("/user",
//     (req,res,next)=>{
//         console.log('first route');
//         // next();
//         res.send("lets check server route on port 7777");
//     },
// )

// app.post("/signup", async (req, res)=>{
//     const user = new User({
//         firstName : "Virat",
//         lastName : "Sharma",
//         emailId : "virat.sharam@wrogn.in",
//         password : "Virat@8989"
//     });


//     await user.save();
//     res.send("User Added successfully");
// });

/* app.post("/signup",async (req,res)=>{

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
}); */

/* app.post("/login",async(req,res)=>{
    const {emailId,password} = req.body;

    try{
        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid creaditial");
        }

        // const isPasswordVaild = await bcrypt.compare(password, user.password);
        const isPasswordVaild = await user.validatePassword(password);

        if(isPasswordVaild){
            // const token = await jwt.sign({'_id':user._id},"secret_dev_key_007", {
                // expiresIn : "7d",
            // });

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
}) */

/* app.get('/profile',userAuth, async(req,res)=>{
    try{
       const user = req.user

        res.send(user);
    }catch(err){
        throw new Error("somthing went to worng"+err);
    }
}) */

//get user by emailId
app.get("/user",async(req,res)=>{
    const userEmail = req.body.emailId;
    try{
        if(!validator.isEmail(userEmail)){
            res.status(400).send("Invalid email Id");
        }
        const user = await User.findOne({"emailId":userEmail});
        if(!user){
            res.status(404).send("User not found");
            return;
        }
        res.status(200).send(user);
        return;
    }catch(err){
        res.status(400).send("something went to wrong "+ err);
        return;
    }
});

// get feed all user find()
app.get("/feed", async(req,res)=>{
    try{
        const allUser = await User.find({});
        
        if(!allUser){
            res.status(404).send("Users not found");
            return;
        }else{
            res.status(200).send(allUser);
        }
    }catch(err){
        res.status(400).send("Something went to wrong");
    }
})

//delete user
app.delete("/user",async(req,res)=>{
    const emailId = req.body.emailId;
    const userId = req.body.userId;
    try{
        const user = await User.findOneAndDelete({"_id" : userId});
        res.send("user deleted successfully");
    }catch(err){
        res.status(400).send("Something went to wrong");
    }

});

//update user
app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    console.log({'data':data, 'userId':userId})

    
    try{
        const ALLOWED_UPDATE = ["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATE.includes(k)
        );
    
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }
    
        if(data?.skills.length > 10){
            throw new Error("skill cannot be more than 10");
        }
        const user = await User.findOneAndUpdate({"_id":userId},data,{
            returnDocument : "after",
            runValidators : true,
        });
        res.send("User update successfully");
    }catch(err){
        res.status(400).send("Something went to wrong"+err);
    }
})


connectDB()
.then(()=>{
    console.log("Database connection establish")
    app.listen("7777",()=>{
        console.log("the server is running on port 7777");
    })
})
.catch(err=>{
    console.error('Database connection failed '+err);
});




