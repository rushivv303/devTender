const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://xyz.net/");
};

module.exports=connectDB;