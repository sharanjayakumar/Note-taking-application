const express=require("express")
const notemodel=require("../Model/notes")
const jwt=require("jsonwebtoken")
const router=express.Router()
router.get("/viewnote",async (req,res)=>{
    if(req.headers.authorization)
    {
        token=req.headers.authorization.slice(7)
        console.log(token)
    }
    else{
        res.status(400).json({message:"error"})
        return;
    }
    let data=jwt.verify(token,process.env.JWT_KEY)
        const notes = await notemodel.find().exec();
        return res.json(notes);
    
})
router.post("/addnote",async (req,res)=>{
    if(!req.headers.authorization){
        return res.json({message:"Unauthorised"})
    }
    console.log(req.headers.authorization)
    const token=req.headers.authorization.slice(7)
    console.log(token)
    const data=jwt.verify(token,process.env.JWT_KEY);
    const newnote=new notemodel(req.body)
    await newnote.save()
    res.send({message:"successful"})
})
router.put("/editnote/:id",async (req,res)=>{
    const cid=req.params.id;
    let value=await notemodel.findByIdAndUpdate(cid,{title:req.body.title,subtitle:req.body.subtitle,category:req.body.category,description:req.body.description})
    res.send(value)
})
router.delete("/deletenote/:id",async (req,res)=>{
    try{
        const del=await notemodel.deleteOne({_id:req.params.id}).exec()
        res.send(del)
    }
    catch(err)
    {
        res.send(err)
    }
})


module.exports=router;