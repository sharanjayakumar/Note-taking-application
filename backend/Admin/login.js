const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
router.post("/admin-login",async (req,res)=>{
    if(req.body.username=="admin" && req.body.password=="admin123")
    {
        const token=jwt.sign({username:req.body.username,password:req.body.password},process.env.JWT_KEY)
        res.send(token)
    }
    else{
        res.send({message:"error"})
    }
    
})
module.exports=router;