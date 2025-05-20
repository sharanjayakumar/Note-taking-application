const express=require("express")
const notemodel=require("../Model/notes")
const viewuser=require("../Model/user")
const jwt=require("jsonwebtoken")
const router=express.Router()
router.get("/viewnote/:id",async (req,res)=>{
   if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     token=req.headers.authorization.slice(7)
    let data=jwt.verify(token,process.env.JWT_KEY)
    const cid=req.params.id
    const notes = await notemodel.findOne({_id:cid}).populate("user","username").select("-password");
    return res.json(notes);
    
})
router.get("/viewnote",async (req,res)=>{
    if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     const token=req.headers.authorization.slice(7)
    let data=jwt.verify(token,process.env.JWT_KEY)
    if(!req.query && !req.query.title)
    {
        const notes = await notemodel.find().populate("user","username").select("-password");
        console.log(notes)
        for(let i=0;i<notes.length;i++)
        {
            notes[i].description=notes[i].description.slice(0,30);
        }
         //notes.description=notes
        return res.json(notes);
    }
    
    else{
        const notes=await notemodel.find({title:{$regex:req.query.title,$options:"i"}}).exec()
        res.json(notes)
    }
        

    
})
router.get("/viewuser",async (req,res)=>{
    if(req.headers.authorization)
    {
        token=req.headers.authorization.slice(7)
    }
    else{
        res.status(400).json({message:"error"})
        return;
    }
    let data=jwt.verify(token,process.env.JWT_KEY)
    const viewusers=await viewuser.find().populate().select("-password")
    res.json(viewusers);
})
router.post("/addnote",async (req,res)=>{
    if(!req.headers.authorization){
        return res.json({message:"Unauthorised"})
    }
    console.log(req.headers.authorization)
    const token=req.headers.authorization.slice(7)
    const data=jwt.verify(token,process.env.JWT_KEY);
    const newnote=new notemodel({ title:req.body.title,
            subtitle:req.body.subtitle,
            category:req.body.category,
            description:req.body.description,approved:true})
    await newnote.save()
    res.send({message:"successful"})
})
router.put("/editnote/:id",async (req,res)=>{
     if(!req.headers.authorization){
        return res.json({message:"Unauthorised"})
    }
    console.log(req.headers.authorization)
    const token=req.headers.authorization.slice(7)
    const data=jwt.verify(token,process.env.JWT_KEY);
    const cid=req.params.id;
    let value=await notemodel.findByIdAndUpdate(cid,{title:req.body.title,subtitle:req.body.subtitle,category:req.body.category,description:req.body.description},{new:true})
    res.send(value)
})
router.delete("/deletenote/:id",async (req,res)=>{
     if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     const token=req.headers.authorization.slice(7)
    let data=jwt.verify(token,process.env.JWT_KEY)
    try{
        const del=await notemodel.deleteOne({_id:req.params.id}).exec()
        res.send(del)
    }
    catch(err)
    {
        res.send(err)
    }
})
router.get("/approve",async (req,res)=>{
     if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     const token=req.headers.authorization.slice(7)
    let data=jwt.verify(token,process.env.JWT_KEY)
    let value=await notemodel.find({approved:true}).exec()
    res.send(value)
})
router.get("/reject",async (req,res)=>{
     if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     const token=req.headers.authorization.slice(7)
    let data=jwt.verify(token,process.env.JWT_KEY)
    let value=await notemodel.find({approved:false}).exec()
    res.send(value)
})
router.put("/approve/:id",async (req,res)=>{
     if(!req.headers.authorization){
        return res.json({message:"Unauthorised"})
    }
    console.log(req.headers.authorization)
    const token=req.headers.authorization.slice(7)
    const data=jwt.verify(token,process.env.JWT_KEY);
     const cid=req.params.id;
    let value=await notemodel.findByIdAndUpdate(cid,{approved:true},{new:true})
    res.send(value)
})
router.delete("/delete/reject/:id",async (req,res)=>{
     if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     const token=req.headers.authorization.slice(7)
    let data=jwt.verify(token,process.env.JWT_KEY)
    const value=await notemodel.findById({_id:req.params.id})
    if(value.approved==false)
    {
        try{
        const del=await notemodel.deleteOne({_id:req.params.id}).exec()
        res.send(del)
    }
    catch(err)
    {
        res.send(err)
    }
    }
})
router.get("/category/:cat",async (req,res)=>{
      if(!req.headers.authorization)
    {
         res.status(400).json({message:"error"})
        return;
       
    }
     const token=req.headers.authorization.slice(7)
    console.log(token)
    let data=jwt.verify(token,process.env.JWT_KEY)
    let value=await notemodel.find({category:req.params.cat}).populate("user","username").select("-password");
    res.send(value);
})

module.exports=router;