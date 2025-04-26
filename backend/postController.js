const express=require("express")
const notemodel=require("./Model/notes")
const router=express.Router()
const jwt=require("jsonwebtoken")
router.post("/addnote",async (req,res)=>{
    if(!req.headers.authorization){
        return res.json({message:"Unauthorised"})
    }
    const token=req.headers.authorization.slice(7)
    const data=jwt.verify(token,process.env.JWT_KEY);
    const newnote=new notemodel(req.body)
    await newnote.save()
    res.send({message:"successful"})
})
module.exports=router;
