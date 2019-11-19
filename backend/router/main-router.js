"use strict";
const express = require("express");
const router = express.Router();

const UserDAO = require("../dao/UserDAO");


router.get("/", function(req, res) {
    res.render("index");
});

router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", function(req, res) {
    console.log(req.body); // testing

    // 변수 선언할때 무조건 let 쓰자. var 절대 쓰지 마셈
    let user = {
        email: req.body.email,
        password: req.body.password
    };

    let userDAO = new UserDAO();
    userDAO.authUser(user, function(result) {
        if (result) {
            // 로그인 처리
            req.session.user = user.email;
        }
        res.render("login", {success: result, email: user.email});
    });
});

router.get("/logout", function(req, res) {
    req.session.user = null;
    res.redirect("/login");
});

router.get("/signup", function(req, res) {
    res.render("signup");
});

router.post("/signup", function(req, res) {
    let user = {
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
    };

    if (!user.email || !user.password || !user.nickname || !req.body.password2) {
        res.render("signup", {message: "모든 필드를 입력해주세요."});
        return;
    }

    if (user.password !== req.body.password2) {
        res.render("signup", {message: "비밀번호가 일치하지 않습니다."});
        return;
    }

    let userDAO = new UserDAO();
    userDAO.checkExistedEmail(user.email, function(result) {
        if (result) {
            res.render("signup", {message: "이미 가입된 이메일입니다."});
            return;
        }

        userDAO.checkExistedNickname(user.nickname, function(result) {
            if (result) {
                res.render("signup", {message: "이미 존재하는 닉네임입니다."});
                return;
            }

            userDAO.createUser(user, function(result) {
                if (result) {
                    req.session.user = user.email;
                    res.redirect("/login");
                }
                else {
                    res.render("signup", {message: "가입 실패"});
                }
            });
        });
    });
});


module.exports = router;
