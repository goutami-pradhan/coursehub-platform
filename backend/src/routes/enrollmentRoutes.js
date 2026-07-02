const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const {

    enrollCourse,

    getEnrollments,

    updateEnrollment

} = require("../controllers/enrollmentController");


// Student Enroll
router.post(

    "/",

    authMiddleware,

    roleMiddleware("student"),

    enrollCourse

);


// View Enrollments
router.get(

    "/",

    authMiddleware,

    getEnrollments

);


// Admin Update Status
router.put(

    "/:id",

    authMiddleware,

    roleMiddleware("admin"),

    updateEnrollment

);

module.exports = router;