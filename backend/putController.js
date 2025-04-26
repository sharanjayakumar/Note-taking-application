const express=require("express")
const router=express.Router()
const notemodel=require("./Model/notes")
router.put("/editnote/:id",async (req,res)=>{
    const cid=req.params.id;
    let value=await notemodel.findByIdAndUpdate(cid,{title:req.body.title,subtitle:req.body.subtitle,category:req.body.category,description:req.body.description})
    res.send(value)
})

module.exports=router;