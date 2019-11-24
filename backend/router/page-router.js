"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const pageDAO = require("../dao/PageDAO");
const commentDAO = require("../dao/CommentDAO");
const postDAO = require("../dao/PostDAO");
const donateDAO = require("../dao/DonateDAO");


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
        pageInfo.donate_classes = await donateDAO.getDonateClassesOfPage(pageId);
        pageInfo.posts = await postDAO.getPostsFromPage(pageId);
        pageInfo.commaNumber = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        res.render("page", pageInfo);
    }
    else next();
}));


// 댓글 작성
router.post("/comment", asyncHandler(async (req, res) => {
    console.log(req.body);
    if (req.session.user) {
        await commentDAO.addComment(req.session.user.id, req.body.post_id, req.body.content);
    }

    res.redirect(req.query.next || "/");
}));

// 댓글 삭제
router.post("/uncomment", asyncHandler(async (req, res) => {
    console.log(req.body);
    let comment = await commentDAO.getComment(req.body.id);

    if (comment && req.session.user.id === comment.user_id) {
        await commentDAO.removeComment(req.body.id);
    }

    res.redirect(req.query.next || "/");
}));


// 구독하기
router.get("/subscribe/:id", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.id);

    if (req.session.user && page.creator_id !== req.session.user.id) {
        await pageDAO.updateSubscriber(req.params.id, req.session.user.id, 1);
    }

    res.redirect("/page/" + req.params.id);
}));

// 구독취소
router.get("/unsubscribe/:id", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.id);

    if (req.session.user && page.creator_id !== req.session.user.id) {
        await pageDAO.updateSubscriber(req.params.id, req.session.user.id, 0);
    }

    res.redirect("/page/" + req.params.id);
}));

module.exports = router;
