 const mongoose=require("mongoose")
 const savedNotesSchema=mongoose.Schema({
    user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"userlogin"
        },
    notes:{
        type:mongoose.Schema.Types.ObjectId,
            ref:"notes"
    }
 })
 module.exports=mongoose.model("savednotes",savedNotesSchema)