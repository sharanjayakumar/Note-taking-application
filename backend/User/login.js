const express=require("express")
const router=express.Router()
const jwt=require("jsonwebtoken")
const user = require("../Model/user")
const { check,validationResult } = require('express-validator');
const e = require("express");
router.get("/userlogin",async (req,res)=>{
    let user = await userlogin.find().exec()
        res.json(user)
})
router.post("/userlogin/register",[check('email', 'Email length should be 10 to 30 characters')
    .isEmail().isLength({ min: 10, max: 30 }),
check('name', 'Name length should be 10 to 20 characters')
    .isLength({ min: 10, max: 20 }),
check('mobile', 'Mobile number should contains 10 digits')
    .isLength({ min: 10, max: 10 }),
check('password', 'Password length should be 8 to 10 characters')
    .isLength({ min: 8})], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    {
        res.send({errors:errors.array()})
        return
    }
    const userdata = await user.findOne({username:req.body.username})
    if(userdata){
        res.send({message:"user already found"})
    }
    else{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(hash)
            let login= new userlogin({
                username:req.body.username,password:hash})
                
            login.save()
    
    res.send({message: "sucessful"})
        }
    })
}
})