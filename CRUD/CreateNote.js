const express = require('express');
const router = express.Router();

// middleware
const auth = require('../Middleware/auth');
// // models (schemas)
const Notes = require('../models/Notes');

router.post('/', auth, async (req, res) => {
    // console.log(req.userId)

    const { title, description } = req.body;
    const newNotes = new Notes();
    newNotes.title = title,
    newNotes.description = description,
    newNotes.userId  = req.userId

    try {
        const createNotes = await newNotes.save();
        res.json({createNotes}).status(201);
        console.log("create note success")


    } catch (error) {
        console.error(error)
        res.status(500).json({ massage: "creating notes Error" })
    }
})



module.exports = router;