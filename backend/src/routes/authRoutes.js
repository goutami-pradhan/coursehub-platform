const express = require("express");
const { body } = require("express-validator");

const {
    registerUser,
    loginUser,
    getProfile
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const validationMiddleware = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
    "/register",
    [
        body("name").notEmpty(),
        body("email").isEmail(),
        body("password").isLength({ min: 6 })
    ],
    validationMiddleware,
    registerUser
);

router.post(
    "/login",
    [
        body("email").isEmail(),
        body("password").notEmpty()
    ],
    validationMiddleware,
    loginUser
);

router.get(
    "/profile",
    authMiddleware,
    getProfile
);

module.exports = router;