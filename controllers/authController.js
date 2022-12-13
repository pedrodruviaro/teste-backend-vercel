const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateLogin, validateRegister } = require("../services/validations");

module.exports = {
    // controlling the register route
    async registerController(req, res) {
        try {
            // checking for errors
            const { error } = validateRegister(req.body);
            if (error) return res.status(400).json(error.details[0].message);

            // email is valid, but useraname are?
            const usernameExists = await User.findOne({
                username: req.body.username,
            });
            if (usernameExists)
                return res
                    .status(400)
                    .json("Username already in use. Try other!");

            // cheking if user already exists
            const emailExists = await User.findOne({ email: req.body.email });
            if (emailExists)
                return res.status(400).json("Email already registered!");
        } catch (error) {
            return res.status(500).json(error);
        }

        try {
            // if is all good
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                username: req.body.username,
                password: hashedPass,
                email: req.body.email,
            });

            const savedUser = await user.save();
            const { password, ...rest } = savedUser._doc;
            return res.status(200).json(rest);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    // controlling the login route
    async loginController(req, res) {
        try {
            // validatin input
            const { error } = validateLogin(req.body);
            if (error) return res.status(400).json(error.details[0].message);

            // check if user exists
            const user = await User.findOne({ email: req.body.email });
            if (!user) return res.status(401).json("Wrong Credentials");

            // checking password matches
            const validPass = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (!validPass) return res.status(401).json("Wrong Credentials");

            // all good
            const token = jwt.sign(
                { userId: user._id },
                process.env.TOKEN_SECRET
            );
            const { password, ...rest } = user._doc;
            res.header("Authorization").json({ ...rest, token });
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};
