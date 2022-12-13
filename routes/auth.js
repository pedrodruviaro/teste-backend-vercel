const router = require("express").Router();
const {
    registerController,
    loginController,
} = require("../controllers/authController.js");

// REGISTER A NEW USER
router.post("/register", registerController);

// LOGIN A USER
router.post("/login", loginController);

module.exports = router;
