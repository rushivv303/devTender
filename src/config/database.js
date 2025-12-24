const mongoose = require("mongoose");

//JalhB89we0MQHivB
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://xyz.nmmm");
};

module.exports=connectDB;