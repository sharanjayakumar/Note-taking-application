const express=require("express")
const notemodel=require("./Model/notes")
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
    const notes=await notemodel.find().exec()
    res.json(notes)
})
module.exports=router;