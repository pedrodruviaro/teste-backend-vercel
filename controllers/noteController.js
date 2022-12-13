const Note = require("../models/Note");
const jwt = require("jsonwebtoken");

module.exports = {
    // create a new post
    async newPostController(req, res) {
        // checking if params id is equal to token id
        try {
            const { userId } = jwt.verify(
                req.header("Authorization"),
                process.env.TOKEN_SECRET
            );

            const isSameId = req.params.id === userId;
            if (!isSameId) return res.status(401).json("Wrong credentials");
        } catch (error) {
            return res.status(500).json(error);
        }

        try {
            // logic to insert into database
            const note = new Note({
                note: req.body.note,
                category: req.body.category,
                userId: req.params.id,
            });

            const savedNote = await note.save();
            return res.status(200).json(savedNote);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // get all notes from a user
    async getNotesController(req, res) {
        const userId = req.params.id;

        try {
            const notes = await Note.find({ userId: userId });
            res.status(200).json(notes);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // delete a note
    async deleteNoteController(req, res) {
        // checking if params id is equal to token id
        try {
            const { userId } = jwt.verify(
                req.header("Authorization"),
                process.env.TOKEN_SECRET
            );

            const isSameId = req.params.userId === userId;
            if (!isSameId) return res.status(401).json("Wrong credentials");
        } catch (error) {
            return res.status(500).json(error);
        }

        // delete a note
        try {
            const noteId = req.params.noteId;

            await Note.findByIdAndDelete(noteId);
            res.status(200).json(`Note ${noteId} deleted.`);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // update a note
    async updateNoteController(req, res) {
        // checking if params id is equal to token id
        try {
            const { userId } = jwt.verify(
                req.header("Authorization"),
                process.env.TOKEN_SECRET
            );

            const isSameId = req.params.userId === userId;
            if (!isSameId) return res.status(401).json("Wrong credentials");
        } catch (error) {
            return res.status(500).json(error);
        }

        try {
            // update a note
            const note = await Note.findById(req.params.noteId);
            await note.updateOne({ $set: req.body });
            res.status(200).json(`Note ${req.params.noteId} updated`);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};
