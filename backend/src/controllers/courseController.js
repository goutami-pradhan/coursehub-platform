const Course = require("../models/Course");


// ===============================
// Create Course
// ===============================
const createCourse = async (req, res) => {

    try {

        const {
            title,
            description,
            instructor,
            duration,
            price,
            level
        } = req.body;

        const course = await Course.create({

            title,
            description,
            instructor,
            duration,
            price,
            level,
            createdBy: req.user.id

        });

        res.status(201).json({

            success: true,
            message: "Course Created Successfully",
            data: course

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ===============================
// Get All Courses
// ===============================
const getCourses = async (req, res) => {

    try {

        const courses = await Course.find()

            .populate("createdBy", "name email role");

        res.json({

            success: true,
            count: courses.length,
            data: courses

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ===============================
// Get Course By Id
// ===============================
const getCourseById = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id)

            .populate("createdBy", "name email role");

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course Not Found"

            });

        }

        res.json({

            success: true,
            data: course

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ===============================
// Update Course
// ===============================
const updateCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course Not Found"

            });

        }

        const updatedCourse = await Course.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,
                runValidators: true

            }

        );

        res.json({

            success: true,
            message: "Course Updated Successfully",
            data: updatedCourse

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


// ===============================
// Delete Course
// ===============================
const deleteCourse = async (req, res) => {

    try {

        const course = await Course.findById(req.params.id);

        if (!course) {

            return res.status(404).json({

                success: false,
                message: "Course Not Found"

            });

        }

        await course.deleteOne();

        res.json({

            success: true,
            message: "Course Deleted Successfully"

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: "Server Error"

        });

    }

};


module.exports = {

    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse

};