"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const userDAO = require("../dao/UserDAO");



router.get("/", asyncHandler(async (req, res) => {
    let data = {};

    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        if (user) {
            data.user = user;
        }
    }

    res.render("index", data);
}));

router.get("/favicon.ico", function(req, res) {
    res.status(404).end();
})


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
