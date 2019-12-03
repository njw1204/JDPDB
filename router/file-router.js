"use strict";
const express = require("express");
const multer = require("multer");
const path = require("path");
const asyncHandler = require("express-async-handler");
const upload = require("../upload");
const router = express.Router();

const userDAO = require("../dao/UserDAO");
const pageDAO = require("../dao/PageDAO");
const categoryDAO = require("../dao/CategoryDAO");
const fileDAO = require("../dao/FileDAO");


router.get("/", (req, res) => {
    res.render("upload");
});

router.post("/", upload.single("file"), asyncHandler(async (req, res) => {
    let fileUrl = "/media/" + req.file.filename;
    let fileId = await fileDAO.addFileAndGetId(fileUrl);
    res.json({
        id: fileId,
        url: fileUrl
    });
}));


module.exports = router;
