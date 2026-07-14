const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");
const upload = require("../config/multer");

const {

   enrollCourse,

    getEnrollments,

    updateEnrollment,

    updateStatus,

    uploadDocument,

    addComment,

    getDocuments,

    deleteDocument,

    getEnrollmentById



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

router.put(
    "/status/:id",
    authMiddleware,
    roleMiddleware("admin"),
    updateStatus
);

router.post(

    "/comment/:id",

    authMiddleware,

    addComment

);
router.post(

    "/document/:id",

    authMiddleware,

    upload.single("file"),

    uploadDocument

);

router.post(

    "/document/:id",

    authMiddleware,

    upload.single("file"),

    uploadDocument

);

router.get(

    "/document/:id",

    authMiddleware,

    getDocuments

);

router.delete(

    "/document/:id/:docId",

    authMiddleware,

    deleteDocument

);

router.get(

    "/:id",

    authMiddleware,

    getEnrollmentById

);

module.exports = router;
