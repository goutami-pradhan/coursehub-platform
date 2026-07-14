const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================
// Register User
// ==========================
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
    return res.status(400).json({
        success: false,
        message: "Name, Email and Password are required."
    });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email)) {
    return res.status(400).json({
        success: false,
        message: "Invalid email format."
    });
}

if (password.length < 10) {
    return res.status(400).json({
        success: false,
        message: "Password should be at least 10 characters."
    });
}

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "student"
        });

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }
};

// ==========================
// Login
// ==========================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
    return res.status(400).json({
        success: false,
        message: "Email and Password are required."
    });
}

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });

        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });

        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Something went wrong. Please try again later."

        });

    }

};

// ==========================
// Profile
// ==========================

const getProfile = async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

    return res.status(404).json({

        success: false,

        message: "User not found."

    });

}

        res.json({

            success: true,

            data: user

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {

    registerUser,

    loginUser,

    getProfile

};