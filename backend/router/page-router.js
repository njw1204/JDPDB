"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const pageDAO = require("../dao/PageDAO");
const postDAO = require("../dao/PostDAO");


// url example : http://127.0.0.1:3000/page/1
router.get("/:id", asyncHandler(async (req, res, next) => {
    let pageId = Number(req.params.id);
    let pageInfo = await pageDAO.getPageBasicInfo(pageId);
    if (pageInfo) {
        pageInfo.subscribe_count = (await pageDAO.getPageSubscribers(pageId)).length;
        pageInfo.isAdmin = (req.session.user && req.session.user.nickname === pageInfo.nickname);

        if (req.session.user) {
            let donated = await pageDAO.getUserToPageBasicInfo(req.session.user.id, pageId);
            pageInfo.total_donate_from_me = donated.total_donate || 0;
            pageInfo.my_class_level = donated.class_level || 0;
            pageInfo.subscribe = donated.subscribe ? true : false;
        }
        else {
            pageInfo.total_donate_from_me = 0;
            pageInfo.my_class_level = 0;
            pageInfo.subscribe = false;
        }

        pageInfo.required = await pageDAO.getPageRequiredProducts(pageId);
        pageInfo.posts = await postDAO.getPostsFromPage(pageId);
        res.render("page", pageInfo);
    }
    else next();
}));


module.exports = router;
