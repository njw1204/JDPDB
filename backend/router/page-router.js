"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const userDAO = require("../dao/UserDAO");
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


// 현금 후원
router.post("/donate-money", asyncHandler(async (req, res) => {
    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);

        if (Number(req.body.cost) < 1000) {
            req.session.message = "최소 1000원 이상 후원할 수 있습니다.";
        }
        else if (user.point < Number(req.body.cost)) {
            req.session.message = "포인트가 부족합니다.";
        }
        else {
            await donateDAO.donateMoney(req.session.user.id, req.body.page_id, req.body.cost, req.body.message);
        }
    }

    res.redirect(req.query.next || "/");
}));

// 상품 후원
router.post("/donate-product", asyncHandler(async (req, res) => {
    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        let product = await donateDAO.getProduct(req.body.product_id);

        if (user.point < product.cost * Number(req.body.product_count)) {
            req.session.message = "포인트가 부족합니다.";
        }
        else {
            await donateDAO.donateProduct(req.session.user.id, req.body.page_id, req.body.product_id, req.body.product_count, req.body.message);
        }
    }

    res.redirect(req.query.next || "/");
}));


// 도네 받은 목록 보기
router.get("/donate-log/:pageid", asyncHandler(async (req, res) => {
    let logMoneys = await donateDAO.getDonateMoneysOfPage(req.params.pageid);
    let logProducts = await donateDAO.getDonateProductsOfPage(req.params.pageid);
    res.render("donate-log", {logMoneys, logProducts});
}));


// 필요 물품 관리
router.get("/required-product/:pageid", asyncHandler(async (req, res) => {
    let data = {};

    data.pageId = req.params.pageid;
    data.products = await donateDAO.getAllProducts();
    data.requiredProducts = await pageDAO.getPageRequiredProducts(req.params.pageid);

    res.render("required", data);
}));

router.post("/add-required-product/:pageid", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.pageid);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await pageDAO.addPageRequiredProduct(req.params.pageid, req.body.product_id, req.body.product_count);
    }
    res.redirect(req.query.next || "/");
}));

router.post("/delete-required-product/:pageid", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.pageid);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await pageDAO.deletePageRequiredProduct(req.params.pageid, req.body.product_id);
    }
    res.redirect(req.query.next || "/");
}));


// 글 작성
router.get("/post/:id", asyncHandler(async (req, res) => {
    res.render("write", {id: req.params.id});
}));

router.post("/post/:id", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.id);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await postDAO.addPost(page.id, req.body.title, req.body.content, req.body.min_class_level, [], []);
    }

    res.redirect(req.query.next || "/");
}));


// 댓글 작성
router.post("/comment", asyncHandler(async (req, res) => {
    if (req.session.user) {
        await commentDAO.addComment(req.session.user.id, req.body.post_id, req.body.content);
    }

    res.redirect(req.query.next || "/");
}));

// 댓글 삭제
router.post("/uncomment", asyncHandler(async (req, res) => {
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
