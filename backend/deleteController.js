const express=require("express")
const notemodel=require("./Model/notes")
const router=express.Router()
router.delete("/deletenote:/id",async (req,res)=>{
    try{
        const del=await notemodel.deleteOne({_id:req.params.id}).exec()
        res.send(del)
    }
    catch(err)
    {
        res.send(err)
    }
})
module.exports=exports;
