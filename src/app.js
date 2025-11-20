const express = require("express");
const app = express();

app.use("/",(req,res)=>{
    res.send("lets check server route on port 7777");
})

app.listen("7777",()=>{
    console.log("the server is running on port 7777");
})