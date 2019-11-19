"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const pageDAO = require("../dao/PageDAO");

// url example : http://127.0.0.1:3000/page/1
router.get("/:id", asyncHandler(async (req, res, next) => {
    let pageId = Number(req.params.id);
    let pageInfo = await pageDAO.getPageBasicInfo(pageId);
    if (pageInfo) {
        pageInfo.subscribe_count = (await pageDAO.getPageSubscribers(pageId)).length;
        res.render("page", pageInfo);
    }
    else next();
}));


module.exports = router;
