const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const userlogin = require("../Model/user")
const { check, validationResult } = require('express-validator');
const bcrypt=require("bcrypt")

router.get("/userlogin", async (req, res) => {
    let user = await userlogin.find().exec()
    res.json(user)
})
router.post("/userlogin/register", [
    check('email').isEmail().isLength({ min: 10, max: 30 }),
    check('phno').isLength({ min: 10, max: 10 }),
    check('password', 'Password length should be 8 to 10 characters')
        .isLength({ min: 8, max: 10 }),
    check('username').isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    }

    try {
        const userdata = await userlogin.findOne({ username: req.body.username });
        if (userdata) {
            return res.send({ message: "User already found" });
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const login = new userlogin({
            username: req.body.username,
            password: hash,
            phno:req.body.phno,
            email:req.body.email
        });

        await login.save();
        return res.send({ message: "Registration successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: "Server error" });
    }
});
router.post("/userlogin/verify", async (req, res) => {

    const user = await userlogin.findOne({ username: req.body.username })
    if (!user) {
        res.status(400).send({ message: "User not found" })
    }
    else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log(err)
                res.status(400).json({error:"error"})
            }
            if (result) {
                const token = jwt.sign({ username: user.username, id: user._id ,role: user.role}, process.env.JWT_KEY);
                res.send({ token })
            }
            else {
                res.status(400).send({ message: "Password incorrect" })
            }
        })
    }

})
router.put("/updateprofile/:id",async(req,res)=>{
        const cid=req.params.id;
        const hash = await bcrypt.hash(req.body.password, 10);
        const login = new userlogin({
            password: hash,
        });
        let value=await userlogin.findByIdAndUpdate(cid,{password:hash,phno:req.body.phno,email:req.body.email},{new:true})
        res.send(value)
        await login.save();
})
router.get("/viewprofile",async(req,res)=>{
    console.log(req.body)
            if (!req.headers.authorization) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const token = req.headers.authorization.slice(7);
            const data = jwt.verify(token, process.env.JWT_KEY);
            const user = await userlogin.findById(data.id);
            res.send(user);
})
router.put("/editprofile",async(req,res)=>{
    console.log(req.body)
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const token = req.headers.authorization.slice(7);
        const data = jwt.verify(token, process.env.JWT_KEY);
        let value = await userlogin.findByIdAndUpdate(data.id,{username:req.body.username,email:req.body.email,phno:req.body.phno})
        res.send(value);

})
module.exports=router;