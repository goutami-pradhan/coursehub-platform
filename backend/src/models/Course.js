const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({

    title: {

        type: String,
        required: [true, "Course title is required"],
        trim: true

    },

    description: {

        type: String,
        default: ""

    },

    instructor: {

        type: String,

        required: [true, "Instructor name is required"]

    },

    duration: {

        type: String,
        required: true

    },

    price: {

        type: Number,

        default: 0

    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner"
    },

    attachments: [
    {
        fileName: {
            type: String
        },
        fileUrl: {
            type: String
        }
    }
],

    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    }

}, {

    timestamps: true

});

module.exports = mongoose.model("Course", courseSchema);