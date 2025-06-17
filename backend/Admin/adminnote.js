const express = require("express")
const notemodel = require("../Model/notes")
const viewuser = require("../Model/user")
const jwt = require("jsonwebtoken")
const router = express.Router()
var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'noteuploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
})

var upload = multer({ storage: storage });
router.get("/viewnote/:id", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    token = req.headers.authorization.slice(7)
    let data = jwt.verify(token, process.env.JWT_KEY)
    const cid = req.params.id
    const notes = await notemodel.findOne({ _id: cid }).populate("user", "username").select("-password");
    return res.json(notes);

})
router.get("/viewnote", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    const token = req.headers.authorization.slice(7)
    let data = jwt.verify(token, process.env.JWT_KEY)
    if (!req.query && !req.query.title) {
        const notes = await notemodel.find().populate("user", "username").select("-password");
        console.log(notes)
        for (let i = 0; i < notes.length; i++) {
            notes[i].description = notes[i].description.slice(0, 30);
        }
        //notes.description=notes
        return res.json(notes);
    }

    else {
        const notes = await notemodel.find({ title: { $regex: req.query.title, $options: "i" } }).populate("user", "username").select("-password").exec()
        if (notes.length == 0) {
            res.status(400).json({ message: "No result found" })
        }
        res.json(notes)
    }
})
    router.delete("/delete-user/:id", async (req, res) => {
        if (!req.headers.authorization) {
        return res.json({ message: "Unauthorised" })
    }
    console.log(req.headers.authorization)
    const token = req.headers.authorization.slice(7)
    const data = jwt.verify(token, process.env.JWT_KEY);
        try {
            const del = await viewuser.deleteOne({ _id: req.params.id }).exec()
            const dele=await notemodel.deleteMany({user:req.params.id }).exec()
            res.send({message:"success"})

        }
        catch (err) {
            res.send(err)
        }
    })


router.get("/viewuser", async (req, res) => {
    if (req.headers.authorization) {
        token = req.headers.authorization.slice(7)
    }
    else {
        res.status(400).json({ message: "error" })
        return;
    }
    let data = jwt.verify(token, process.env.JWT_KEY)
    if (!req.query && !req.query.username) {
        const viewusers = await viewuser.find().populate().select("-password")
        res.json(viewusers);
    }
    else {
        const viewusers = await viewuser.find({ username: { $regex: req.query.username, $options: "i" } }).populate().select("-password")
        if (viewusers.length == 0) {
            res.status(400).json({ message: "No result found" })
        }
        else {
            res.json(viewusers);
        }

    }

})
router.post("/addnote",upload.single("image"), async (req, res) => {
    if (!req.headers.authorization) {
        return res.json({ message: "Unauthorised" })
    }
    console.log(req.headers.authorization)
    const token = req.headers.authorization.slice(7)
    const data = jwt.verify(token, process.env.JWT_KEY);
    const newnote = new notemodel({
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        description: req.body.description, approved: true,image:req.file ? req.file.filename : 'default.jpg' 
    })
    await newnote.save()
    res.send({ message: "successful" })
})
router.put("/editnote/:id",upload.single("image"),async (req, res) => {
    if (!req.headers.authorization) {
        return res.json({ message: "Unauthorised" })
    }
    console.log(req.headers.authorization)
    const token = req.headers.authorization.slice(7)
    const data = jwt.verify(token, process.env.JWT_KEY);
    const cid = req.params.id;
     const noteimg = await notemodel.findById(data.id);
            let updateData = {
                title:req.body.title,
                subtitle:req.body.subtitle,
                category:req.body.category,
                description:req.body.description,
                image: req.file ? req.file.filename : noteimg.image
            };
           
    let value = await notemodel.findByIdAndUpdate(cid,updateData,{ new: true })
    res.send(value)
})
router.delete("/deletenote/:id", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    const token = req.headers.authorization.slice(7)
    let data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const del = await notemodel.deleteOne({ _id: req.params.id }).exec()
        res.send(del)
    }
    catch (err) {
        res.send(err)
    }
})
router.get("/approve", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    const token = req.headers.authorization.slice(7)
    let data = jwt.verify(token, process.env.JWT_KEY)
    let value = await notemodel.find({ approved: true }).exec()
    res.send(value)
})
router.get("/reject", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    const token = req.headers.authorization.slice(7)
    let data = jwt.verify(token, process.env.JWT_KEY)
    let value = await notemodel.find({ approved: false }).populate("user").select("-password").exec()
    res.send(value)
})
router.put("/approve/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.json({ message: "Unauthorised" })
    }
    console.log(req.headers.authorization)
    const token = req.headers.authorization.slice(7)
    const data = jwt.verify(token, process.env.JWT_KEY);
    const cid = req.params.id;
    let value = await notemodel.findByIdAndUpdate(cid, { approved: true }, { new: true })
    res.send(value)
})
router.delete("/delete/reject/:id", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    const token = req.headers.authorization.slice(7)
    let data = jwt.verify(token, process.env.JWT_KEY)
    const value = await notemodel.findById({ _id: req.params.id })
    if (value.approved == false) {
        try {
            const del = await notemodel.deleteOne({ _id: req.params.id }).exec()
            res.send(del)
        }
        catch (err) {
            res.send(err)
        }
    }
})
router.get("/category/:cat", async (req, res) => {
    if (!req.headers.authorization) {
        res.status(400).json({ message: "error" })
        return;

    }
    const token = req.headers.authorization.slice(7)
    console.log(token)
    let data = jwt.verify(token, process.env.JWT_KEY)
    let value = await notemodel.find({ category: req.params.cat, title: { $regex: req.query.title, $options: "i" } }).populate("user", "username").select("-password");
    res.send(value);
})

module.exports = router;