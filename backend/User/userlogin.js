const express=require("express")
const jwt=require("jsonwebtoken")
const notes=require("../Model/notes")
const router=express.Router()
router.get("/user",async(req,res)=>{
    console.log(req.headers.authorization)
    if(req.headers.authorization){
        token=req.headers.authorization.slice(7)
        console.log(token) 
    }
    else{
        res.status(400).json({message:"error"})
        return;
    }
    let data=jwt.verify(token,process.env.JWT_KEY)
    console.log(data.username)
    console.log(data.id)
    try{
        const note=notes.find({user:data.id}).exec()
        res.json(note)
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
   
});
router.post("/useradd",async(req,res)=>{
    console.log(req.body)
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = req.headers.authorization.slice(7);
        const data = jwt.verify(token, process.env.JWT_KEY); 
        const newnote=new notes({
            title:req.body.title,
            subtitle:req.body.subtitle,
            category:req.body.category,
            description:req.body.description,
            user:data.id
        })
        try{
            await newnote.save()
            res.send({message:"successful"})
        }
        catch(error)
        {
            res.send({message:"error"})
        }
})
module.exports=router;
