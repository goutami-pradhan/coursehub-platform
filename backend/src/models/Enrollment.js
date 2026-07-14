const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({

    student: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true

    },

    course: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "Course",

        required: true

    },

    status: {

        type: String,

        enum: [ "Pending",
        "Approved",
        "In Progress",
        "Completed"],

        default: "Pending"

    },
     progress: {
        type: Number,
        default: 0
    },

    comments: [
    {
        message: {
            type: String
        },
        user: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
],
documents: [
    {
        fileName: String,
        filePath: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }
],

},


{
      enrolledAt: {
        type: Date,
        default: Date.now
    }
},
 {

    timestamps: true

});

module.exports = mongoose.model("Enrollment", enrollmentSchema);