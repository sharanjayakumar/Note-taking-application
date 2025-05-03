const mongoose=require("mongoose")
const noteSchema=mongoose.Schema({
    title:String,
    subtitle:String,
    category:{
        type:String,
        enum:["C","JAVA","PYTHON","HTML","CSS","JAVASCRIPT"]
    },
    description:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userlogin"
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"login"
    }
})
module.exports=mongoose.model("notes",noteSchema)