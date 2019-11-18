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

router.post("/login", function(req, res, next) {
    console.log(req.body); // testing

    // 변수 선언할때 무조건 let 쓰자. var 절대 쓰지 마셈
    let user = {
        email: req.body.email,
        password: req.body.password
    };

    let userDAO = new UserDAO();
    userDAO.authUser(user, function(result) {
        res.render("login", {success: result, email: user.email});
    });
});


module.exports = router;
