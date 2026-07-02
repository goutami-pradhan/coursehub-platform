const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");

const courseRoutes = require("./routes/courseRoutes");

const enrollmentRoutes = require("./routes/enrollmentRoutes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use("/api/auth", authRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/enrollments", enrollmentRoutes);

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "CourseHub API Running"

    });

});

module.exports = app;