const router = require("express").Router();
const verifyToken = require("../services/verifyToken");
const {
    getNotesController,
    newPostController,
    updateNoteController,
    deleteNoteController,
} = require("../controllers/noteController");

// creating a post
router.get("/:id", verifyToken, getNotesController);
router.post("/:id", verifyToken, newPostController);
router.put("/:userId/:noteId", verifyToken, updateNoteController);
router.delete("/:userId/:noteId", verifyToken, deleteNoteController);

module.exports = router;
