const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");


// ================================
// Enroll Student
// ================================
const enrollCourse = async (req, res) => {

    try {

        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course not found"

            });

        }

        const alreadyEnrolled = await Enrollment.findOne({

            student: req.user.id,

            course: courseId

        });

        if (alreadyEnrolled) {

            return res.status(400).json({

                success: false,

                message: "Already enrolled in this course"

            });

        }

        const enrollment = await Enrollment.create({

            student: req.user.id,

            course: courseId

        });

        res.status(201).json({

            success: true,

            message: "Enrollment Successful",

            data: enrollment

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};



// ================================
// View Enrollments
// ================================
const getEnrollments = async (req, res) => {

    try {

        let enrollments;

        if (req.user.role === "admin") {

            enrollments = await Enrollment.find()

                .populate("student", "name email")

                .populate("course");

        }

        else {

            enrollments = await Enrollment.find({

                student: req.user.id

            })

                .populate("student", "name email")

                .populate("course");

        }

        res.json({

            success: true,

            count: enrollments.length,

            data: enrollments

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};


// ================================
// Update Enrollment Status
// ================================
const updateEnrollment = async (req, res) => {

    try {

        const enrollment = await Enrollment.findById(req.params.id);

        if (!enrollment) {

            return res.status(404).json({

                success: false,

                message: "Enrollment not found"

            });

        }

        enrollment.status = req.body.status;

        await enrollment.save();

        res.json({

            success: true,

            message: "Enrollment Updated",

            data: enrollment

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

module.exports = {

    enrollCourse,

    getEnrollments,

    updateEnrollment

};