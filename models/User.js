const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 50,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 1000,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 100,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
