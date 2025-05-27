const mongoose = require ('mongoose')
const userSchema = mongoose.Schema({
    username:String,
    password:String,
    phno:Number,
    email:String,
    otp:Number,
})
module.exports = mongoose.model("userlogin",userSchema)