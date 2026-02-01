const express = require("express");
const connectDB = require('./config/database')
const app = express();
const User = require('./models/user');
const validator = require("validator");

app.use(express.json());

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

app.post("/signup",async (req,res)=>{



    const user = new User(req.body);
    await user.save();
    res.send("User added successfully");
});

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




