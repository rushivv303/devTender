const mongoose = require('mongoose');
const validator = require('validator');

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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address "+value);
            }
        }
    },
    password : {
        type : String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter strong password" )
            }
        }
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
    },
    imageUrl : {
        type : String,
        default : "https://www.freepik.com/free-photos-vectors/default-user",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid image url");
            }
        }
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);