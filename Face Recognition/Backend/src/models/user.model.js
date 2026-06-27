const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:
    {
        type: String,
        unique: [true, "username is unique"],
        required: [true, "username is required"]
    },
    email:
    {
        type: String,
        unique: [true, "email is unique"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    }
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel