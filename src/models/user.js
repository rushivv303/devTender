const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required:true,
        minLength:1,
        maxLength:30,
    },
    lastName : {
        type : String,
        required:true,
        minLength:1,
        maxLength:30,
    },
    emailId : {
        type : String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    password : {
        type : String,
        required:true,
    },
    age : {
        type : Number,

    },
    gender : {
        type : String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender dose not valid");
            }
        }
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);