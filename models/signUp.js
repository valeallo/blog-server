const mongoose = require("mongoose")


const SignUpSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
        max: 255,
        min: 5,
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
     




},
    {
        timestamps: true
    }

)



module.exports = mongoose.model("signUpModel", signUpSchema, "signUp")