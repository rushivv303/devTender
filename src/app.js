const express = require("express");
const connectDB = require('./config/database')
const app = express();

// app.use("/user",
//     (req,res,next)=>{
//         console.log('first route');
//         // next();
//         res.send("lets check server route on port 7777");
//     },
// )

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




