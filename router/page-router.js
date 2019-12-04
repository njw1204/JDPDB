"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const getVideoId = require("get-video-id");
const crypto = require("crypto");
const fs = require("fs");
const upload = require("../upload");
const router = express.Router();

const userDAO = require("../dao/UserDAO");
const pageDAO = require("../dao/PageDAO");
const commentDAO = require("../dao/CommentDAO");
const postDAO = require("../dao/PostDAO");
const donateDAO = require("../dao/DonateDAO");


let commaNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


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
        pageInfo.commaNumber = commaNumber;
        pageInfo.crypto = crypto;
        pageInfo.url = req.originalUrl;

        res.render("page-view", pageInfo);
    }
    else next();
}));


// 후원 페이지
router.get("/donate/:pageId", asyncHandler(async (req, res) => {
    let data = await pageDAO.getPageBasicInfo(req.params.pageId);
    data.page = data;
    data.products = await pageDAO.getPageRequiredProducts(req.params.pageId);
    data.donate_classes = await donateDAO.getDonateClassesOfPage(req.params.pageId);
    data.subscribe_count = (await pageDAO.getPageSubscribers(req.params.pageId)).length;
    data.isAdmin = (req.session.user && req.session.user.nickname === data.page.nickname);
    data.commaNumber = commaNumber;
    data.url = req.originalUrl;

    if (req.session.user) {
        let donated = await pageDAO.getUserToPageBasicInfo(req.session.user.id, req.params.pageId);
        data.total_donate_from_me = donated.total_donate || 0;
        data.my_class_level = donated.class_level || 0;
        data.subscribe = donated.subscribe ? true : false;

        if (data.isAdmin) {
            data.all_products = await donateDAO.getAllProducts();
        }
    }
    else {
        data.total_donate_from_me = 0;
        data.my_class_level = 0;
        data.subscribe = false;
    }

    res.render("donate", data);
}));


// 현금 후원
router.post("/donate-money/:pageId", asyncHandler(async (req, res) => {
    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);

        if (Number(req.body.cost) < 1000) {
            req.session.message = "최소 1000원 이상 후원할 수 있습니다.";
        }
        else if (user.point < Number(req.body.cost)) {
            req.session.message = "포인트가 부족합니다.";
        }
        else {
            await donateDAO.donateMoney(req.session.user.id, req.params.pageId, req.body.cost, req.body.message);
            req.session.user.point = (await userDAO.getUser(req.session.user.id)).point;
            req.session.message = "정상적으로 후원되었습니다.";
        }
    }

    res.redirect(req.query.next || "/");
}));

// 상품 후원
router.post("/donate-product/:pageId", asyncHandler(async (req, res) => {
    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        let product = await donateDAO.getProduct(req.body.product_id);

        if (user.point < product.cost * Number(req.body.product_count)) {
            req.session.message = "포인트가 부족합니다.";
        }
        else {
            await donateDAO.donateProduct(req.session.user.id, req.params.pageId, req.body.product_id, req.body.product_count, req.body.message);
            req.session.user.point = (await userDAO.getUser(req.session.user.id)).point;
            req.session.message = "정상적으로 후원되었습니다.";
        }
    }

    res.redirect(req.query.next || "/");
}));


// 도네 받은 목록 보기
router.get("/donate-log/:pageId", asyncHandler(async (req, res) => {
    let data = await pageDAO.getPageBasicInfo(req.params.pageId);
    data.subscribe_count = (await pageDAO.getPageSubscribers(req.params.pageId)).length;
    data.isAdmin = (req.session.user && req.session.user.nickname === data.nickname);
    data.url = req.originalUrl;
    data.logMoneys = await donateDAO.getDonateMoneysOfPage(req.params.pageId);
    data.logProducts = await donateDAO.getDonateProductsOfPage(req.params.pageId);
    data.commaNumber = commaNumber;

    if (req.session.user) {
        let donated = await pageDAO.getUserToPageBasicInfo(req.session.user.id, req.params.pageId);
        data.total_donate_from_me = donated.total_donate || 0;
        data.my_class_level = donated.class_level || 0;
        data.subscribe = donated.subscribe ? true : false;
    }
    else {
        data.total_donate_from_me = 0;
        data.my_class_level = 0;
        data.subscribe = false;
    }

    res.render("donate-log", data);
}));


// 필요 물품 관리
router.post("/add-required-product/:pageid", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.pageid);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await pageDAO.addPageRequiredProduct(req.params.pageid, req.body.product_id, req.body.product_count);
        req.session.message = "정상적으로 추가되었습니다.";
    }
    res.redirect(req.query.next || "/");
}));

router.post("/delete-required-product/:pageid", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.pageid);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await pageDAO.deletePageRequiredProduct(req.params.pageid, req.body.product_id);
        req.session.message = "정상적으로 삭제되었습니다.";
    }
    res.redirect(req.query.next || "/");
}));


// 후원 계급 관리
router.post("/add-class/:pageId", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.pageId);

    if (req.session.user && req.session.user.id === page.creator_id) {
        if (await donateDAO.checkDonateClassOfPageByCost(req.params.pageId, req.body.cost)) {
            req.session.message = "동일한 후원 요구치를 가지는 레벨이 이미 존재합니다.";
        }
        else {
            await donateDAO.addDonateClass(req.body.name, req.body.cost, req.body.reward, req.params.pageId);
            await donateDAO.revalidateDonateClass(req.params.pageId);
            req.session.message = "정상적으로 추가되었습니다.";
        }
    }
    res.redirect(req.query.next || "/");
}));

router.post("/delete-class/:pageId", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.pageId);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await donateDAO.deleteDonateClass(req.body.class_id);
        await donateDAO.revalidateDonateClass(req.params.pageId);
        req.session.message = "정상적으로 삭제되었습니다.";
    }
    res.redirect(req.query.next || "/");
}));


// 글 작성
router.get("/post/:id", asyncHandler(async (req, res) => {
    res.render("post", {id: req.params.id});
}));

router.post("/post/:id", upload.array("file"), asyncHandler(async (req, res) => {
    try {
        let page = await pageDAO.getPageBasicInfo(req.params.id);

        if (req.session.user && req.session.user.id === page.creator_id) {
            let tags = req.body.tags.match(/\S+/g) || [];
            let files = [];

            if (req.body.youtube) {
                let video = getVideoId(req.body.youtube);

                if (typeof video.id === "undefined" || video.service !== "youtube") {
                    if (req.files && req.files.length > 0) {
                        for (let file of req.files) {
                            fs.unlink(file.path);
                        }
                    }
                    req.session.message = "잘못된 유튜브 동영상 주소입니다.";
                    return res.redirect("/page/post/" + req.params.id);
                }

                files.push("http://youtube.com/embed/" + video.id);
            }

            if (req.files && req.files.length > 0) {
                for (let file of req.files) {
                    let fileUrl = "/media/" + file.filename;
                    files.push(fileUrl);
                }
            }

            await postDAO.addPost(page.id, req.body.title, req.body.content, req.body.min_class_level, tags, files);
        }

        res.redirect(req.query.next || "/");

    } catch (e) {
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                fs.unlink(file.path);
            }
        }

        if (e.code === "ER_DATA_TOO_LONG") {
            req.session.message = "내용이 너무 깁니다.";
            return res.redirect("/page/post/" + req.params.id);
        }

        throw e;
    }
}));


// 글 삭제
router.post("/unpost/:id", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.id);

    if (req.session.user && req.session.user.id === page.creator_id) {
        await postDAO.removePost(req.body.post_id);
    }

    res.redirect(req.query.next || "/");
}));


// 댓글 작성
router.post("/comment", asyncHandler(async (req, res) => {
    if (req.session.user) {
        try {
            await commentDAO.addComment(req.session.user.id, req.body.post_id, req.body.content);
        }
        catch (e) {
            if (e.code === "ER_DATA_TOO_LONG") {
                req.session.message = "내용이 너무 깁니다.";
            }
            else {
                throw e;
            }
        }
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

    res.redirect(req.query.next || "/page/" + req.params.id);
}));

// 구독취소
router.get("/unsubscribe/:id", asyncHandler(async (req, res) => {
    let page = await pageDAO.getPageBasicInfo(req.params.id);

    if (req.session.user && page.creator_id !== req.session.user.id) {
        await pageDAO.updateSubscriber(req.params.id, req.session.user.id, 0);
    }

    res.redirect(req.query.next || "/page/" + req.params.id);
}));

module.exports = router;
