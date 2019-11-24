"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const userDAO = require("../dao/UserDAO");
const pageDAO = require("../dao/PageDAO");
const categoryDAO = require("../dao/CategoryDAO");



router.get("/", asyncHandler(async (req, res) => {
    let data = {};

    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        if (user) {
            data.user = user;

            let pageId = await pageDAO.getPageIdOfUser(user.id);
            data.user.my_page_id = pageId;

            data.my_subscribe_pages = [];
            for (let id of await pageDAO.getPageIdListSubscribedByUser(user.id)) {
                data.my_subscribe_pages.push(await pageDAO.getPageBasicInfo(id));
            }
        }
        else {
            req.session.user = null;
        }
    }

    let pagesBySubscribe = await pageDAO.getPagesOrderBySubscribe(3);
    let pagesByNewPost = await pageDAO.getPagesOrderByNewPost(3);
    data.pagesBySubscribe = [];
    data.pagesByNewPost = [];
    for (let page of pagesBySubscribe) {
        data.pagesBySubscribe.push(await pageDAO.getPageBasicInfo(page.id));
    }
    for (let page of pagesByNewPost) {
        data.pagesByNewPost.push(await pageDAO.getPageBasicInfo(page.id));
    }

    data.pages = [];
    for (let id of await pageDAO.getPageIdList()) {
        data.pages.push(await pageDAO.getPageBasicInfo(id));
    }

    res.render("index", data);
}));

router.get("/favicon.ico", function(req, res) {
    res.status(404).end();
});


// 페이지 만들기
router.get("/create-page", asyncHandler(async (req, res) => {
    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        let categoryList = await categoryDAO.getCategoryList();
        res.render("create-page", {user, categoryList});
    }
    else {
        res.redirect("/");
    }
}));

router.post("/create-page", asyncHandler(async (req, res) => {
    await pageDAO.createPage(req.session.user.id, req.body.animal_name, req.body.description, req.body.category);
    let pageId = await pageDAO.getPageIdOfUser(req.session.user.id);
    res.redirect("/page/" + pageId);
}));


// 포인트 충전
router.get("/point", asyncHandler(async (req, res) => {
    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        res.render("point", {user: user});
    }
    else {
        res.redirect("/");
    }
}));

router.post("/point", asyncHandler(async (req, res) => {
    if (req.session.user) {
        await userDAO.addPointToUser(req.session.user.id, req.body.amount);
    }

    res.redirect("/");
}));


// login
router.get("/login", function(req, res) {
    res.render("login");
});


router.post("/login", asyncHandler(async (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password
    };

    let acceptedUser = await userDAO.authUser(user);
    req.session.user = acceptedUser || null;
    res.render("login", {success: (acceptedUser ? true : false), email: user.email});
}));


// logout
router.get("/logout", function(req, res) {
    req.session.user = null;

    if (req.query.next) {
        res.redirect(req.query.next);
    }
    else {
        res.redirect("/login");
    }
});


// signup
router.get("/signup", function(req, res) {
    res.render("signup");
});

router.post("/signup", asyncHandler(async (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
    };

    if (!user.email || !user.password || !user.nickname || !req.body.password2)
        return res.render("signup", {message: "모든 필드를 입력해주세요."});

    if (user.password !== req.body.password2)
        return res.render("signup", {message: "비밀번호가 일치하지 않습니다."});

    if (await userDAO.checkExistedEmail(user.email))
        return res.render("signup", {message: "이미 가입된 이메일입니다."});

    if (await userDAO.checkExistedNickname(user.nickname))
        return res.render("signup", {message: "이미 존재하는 닉네임입니다."});

    if (await userDAO.createUser(user)) {
        req.session.user = (await userDAO.authUser(user)) || null;
        res.redirect("/login");
    }
    else
        res.render("signup", {message: "가입 실패"});
}));


module.exports = router;
