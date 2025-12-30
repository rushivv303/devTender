const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://vaidyarushikesh303:JalhB89we0MQHivB@namastenode.oxhothb.mongodb.net/devTinder");
};

module.exports=connectDB;