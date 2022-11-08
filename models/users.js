const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 1,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 1
    },
    password: {
        type: String,
        required: true,
        min: 1
    },
    firstName: {
        type: String,
        required: false
        
    },
    lastName: {
        type: String,
        required: false,
        default: "hello"
    },
    birthDate: {
        type: Date,
        required: true,
        default: Date.now
    }

   
},
{
    timestamps: true //aggiungerà da solo un createdAt e updatedAt ogni volta che viene modificato
})

module.exports = mongoose.model("userModel", UserSchema, "users")