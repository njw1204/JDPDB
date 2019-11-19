"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const userDAO = require("../dao/UserDAO");



router.get("/", function(req, res) {
    res.render("index");
});


// login
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", asyncHandler(async (req, res) => {
    let user = {
        email: req.body.email,
        password: req.body.password
    };

    let isAuth = await userDAO.authUser(user);
    if (isAuth) req.session.user = user.email;
    res.render("login", {success: isAuth, email: user.email});
}));


// logout
router.get("/logout", function(req, res) {
    req.session.user = null;
    res.redirect("/login");
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
        req.session.user = user.email;
        res.redirect("/login");
    }
    else
        res.render("signup", {message: "가입 실패"});
}));


module.exports = router;
