const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id:user._id}, "secret_dev_key_007", {
        expiresIn : "1d",
    });

    return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser)
{
    const user = this;
    const passwordHash = user.password;
    const isPasswordVaild = await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
    return isPasswordVaild;
}

module.exports = mongoose.model("User",userSchema);