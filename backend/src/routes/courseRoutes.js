const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {

    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse

} = require("../controllers/courseController");


// Admin Only
router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createCourse
);

// Everyone Logged In
router.get(
    "/",
    authMiddleware,
    getCourses
);

router.get(
    "/:id",
    authMiddleware,
    getCourseById
);

// Admin Only
router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateCourse
);

//router.get("/:id", protect, getCourseById);

// Admin Only
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteCourse
);

module.exports = router;