const mongoose=require("mongoose")
const noteSchema=mongoose.Schema({
    title:String,
    subtitle:String,
    category:{
        type:String,
        enum:["C","JAVA","PYTHON","HTML","CSS","JAVASCRIPT"]
    },
    description:String
})
module.exports=mongoose.model("notes",noteSchema)