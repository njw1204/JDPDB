"use strict";
const express = require("express");
const multer = require("multer");
const path = require("path");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const userDAO = require("../dao/UserDAO");
const pageDAO = require("../dao/PageDAO");
const categoryDAO = require("../dao/CategoryDAO");
const fileDAO = require("../dao/FileDAO");

const uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "media/");
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        cb(null, guid() + ext);
    }
});
const upload = multer({ storage: uploadStorage });


function guid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


router.get("/", (req, res) => {
    res.render("upload");
});

router.post("/", upload.single("file"), asyncHandler(async (req, res) => {
    let fileUrl = "/media/" + req.file.filename;
    let fileId = await fileDAO.addFile(fileUrl);
    res.json({
        id: fileId,
        url: fileUrl
    });
}));


module.exports = router;
