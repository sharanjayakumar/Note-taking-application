const mongoose = require("mongoose")
const express = require("express")
const jwt = require("jsonwebtoken")
const notes = require("../Model/notes")
const savednotes = require("../Model/savednotes")
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

router.get("/userviewnote", async (req, res) => {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        token = req.headers.authorization.slice(7)
        console.log(token)
    }
    else {
        res.status(400).json({ message: "error" })
        return;
    }
    let data = jwt.verify(token, process.env.JWT_KEY)
    console.log(data.username)
    console.log(data.id)
    if (!req.query && !req.query.title) {
        try {
            const note = await notes.find({ approved: true }).populate("user", "username").select("-password")
            res.json(note)
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
    else {
        const note = await notes.find({ title: { $regex: req.query.title, $options: "i" }, approved: true }).populate("user", "username").select("-password").exec()
        res.json(note)
    }
});
router.get("/userviewmynote", async (req, res) => {
    console.log(req.headers.authorization)
    if (req.headers.authorization) {
        token = req.headers.authorization.slice(7)
        console.log(token)
    }
    else {
        res.status(400).json({ message: "error" })
        return;
    }
    let data = jwt.verify(token, process.env.JWT_KEY)
    console.log(data.username)
    console.log(data.id)
    if (!req.query && !req.query.title) {
        try {
            const note = await notes.find({ user: data.id, approved: true }).populate("user", "username").select("-password")
            res.json(note)
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
    else {
        const note = await notes.find({ title: { $regex: req.query.title, $options: "i" }, user: data.id, approved: true }).populate("user", "username").select("-password")
        res.json(note)
    }

});
router.get("/userviewnote/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const cid = req.params.id;
    const note = await notes.findOne({ _id: cid })
    return (res.json(note));
})
router.post("/useraddnote", upload.single("image"), async (req, res) => {
    console.log(req.body)
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const newnote = new notes({
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        description: req.body.description,
        user: data.id,
        image: req.file ? req.file.filename : 'default.jpg'
    })
    try {
        await newnote.save()
        res.send({ message: "successful" })
    }
    catch (error) {
        res.send({ message: "error" })
    }
});
router.put("/user-editnote/:id", upload.single("image"), async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const cid = req.params.id;
    const noteimg = await notes.findById(data.id);
    let updateData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        description: req.body.description,
        image: req.file ? req.file.filename : noteimg.image
    };

    let value = await notes.findByIdAndUpdate(cid, updateData, { new: true })
    res.send(value)
    // if(data.id)
    // {
    //     let value = await notes.findByIdAndUpdate(cid, { title: req.body.title, subtitle: req.body.subtitle, category: req.body.category, description: req.body.description }, { new: true })
    //     res.send(value)
    // }

})
router.delete("/userdeletenote/:id", async (req, res) => {
    try {
        const del = await notes.deleteOne({ _id: req.params.id }).exec()
        res.send(del)
    }
    catch (err) {
        res.send(err)
    }
})
router.post("/savenote/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const savednote = new savednotes({
        user: data.id,
        notes: req.params.id
    })

    try {
        await savednote.save()
        res.send({ message: "successful" })
    }
    catch (error) {
        res.send({ message: "error" })
    }
})
router.get("/savednotes", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const saved = await savednotes.find({ user: data.id }).populate({ path: "notes", populate: { path: "user", select: "username" } })
    res.json(saved);
})
router.delete("/delete-savednote/:id", async (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    const delsaved = await savednotes.deleteOne({ _id: req.params.id }).exec()
    res.send({ message: "Unsaved" })
})
router.get("/usercount", async (req, res) => {
    const token = req.headers.authorization.slice(7);
    const data = jwt.verify(token, process.env.JWT_KEY);
    console.log(data)
    let [count, savedcount, categorycount] = await Promise.all([
        notes.countDocuments({ user: data.id, approved: true }), savednotes.countDocuments({ user: data.id }), 
        notes.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(data.id), approved: true } },
            { $group: { _id: "$category", totalNotes: { $sum: 1 } } }
        ])
    ])
    res.json({ count, savedcount, categorycount })
})
module.exports = router;