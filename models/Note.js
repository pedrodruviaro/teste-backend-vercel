const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            required: true,
            min: 6,
            max: 500,
        },
        category: {
            type: String,
            required: true,
            min: 6,
            max: 50,
        },
        userId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
