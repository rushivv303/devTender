const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://vaidyarushikesh303:7v1fyt9FXvHVMNOc@ac-gwx6qn1-shard-00-00.oxhothb.mongodb.net:27017,ac-gwx6qn1-shard-00-01.oxhothb.mongodb.net:27017,ac-gwx6qn1-shard-00-02.oxhothb.mongodb.net:27017/?ssl=true&replicaSet=atlas-rz6a04-shard-0&authSource=admin&appName=NamasteNode");
};

module.exports=connectDB;