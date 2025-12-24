const mongoose = require("mongoose");

//JalhB89we0MQHivB
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://vaidyarushikesh303:JalhB89we0MQHivB@namastenode.oxhothb.mongodb.net/");
};

module.exports=connectDB;