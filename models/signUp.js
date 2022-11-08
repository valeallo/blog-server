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
        // required: true,
        // min: 10
    },
    password: {
        type: String,
        // required: true,
        // min: 8
    },
     




},
    {
        timestamps: true
    }

)



module.exports = mongoose.model("signUpModel", signUpSchema, "signUp")