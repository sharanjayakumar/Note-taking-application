const express = require("express")
const jwt = require("jsonwebtoken")
const notes = require("../Model/notes")
const savednotes = require("../Model/savednotes")
const router = express.Router()

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
    if(!req.query && !req.query.title)
    {
        try {
            const note = await notes.find().populate("user", "username").select("-password")
            res.json(note)
        }
        catch (err) {
            res.status(500).json({ message: "Server error", error: err.message });
        }
    }
    else
    {
        const note = await notes.find({title:{$regex:req.query.title,$options:"i"}}).populate("user","username").select("-password").exec()
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
    try {
        const note = await notes.find({user:data.id}).populate("user", "username").select("-password")
        res.json(note)
    }
    catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
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
router.post("/useraddnote", async (req, res) => {
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
        user: data.id
    })
    try {
        await newnote.save()
        res.send({ message: "successful" })
    }
    catch (error) {
        res.send({ message: "error" })
    }
});
router.put("/user-editnote/:id", async (req, res) => {
    const cid = req.params.id;
    let value = await notes.findByIdAndUpdate(cid, { title: req.body.title, subtitle: req.body.subtitle, category: req.body.category, description: req.body.description }, { new: true })
    res.send(value)
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
    const saved=await savednotes.find({user:data.id}).populate({ path: "notes", populate: { path: "user", select: "username" } })
    res.json(saved);
})
module.exports = router;
