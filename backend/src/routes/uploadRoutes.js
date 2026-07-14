const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post(

    "/",

    upload.single("file"),

    (req, res) => {

        res.json({

            success: true,

            fileName: req.file.originalname,

            fileUrl:

                `/uploads/${req.file.filename}`

        });

    }

);

module.exports = router;