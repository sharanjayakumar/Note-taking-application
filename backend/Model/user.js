const mongoose = require ('mongoose')
const userSchema = mongoose.Schema({
    username:String,
    password:String,
    phno:Number,
    email:String
})
module.exports = mongoose.model("userlogin",userSchema)