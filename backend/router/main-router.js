"use strict";
const express = require("express");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const request = require("request");
const router = express.Router();

const userDAO = require("../dao/UserDAO");
const postDAO = require("../dao/PostDAO");
const pageDAO = require("../dao/PageDAO");
const tagDAO = require("../dao/TagDAO");
const categoryDAO = require("../dao/CategoryDAO");
const apiConfig = require("../config").api;


async function sideBarData(req) {
    let data = {};

    if (req.session.user) {
        let user = await userDAO.getUser(req.session.user.id);
        if (user) {
            data.user = user;
            data.my_subscribe_pages = [];
            for (let id of await pageDAO.getPageIdListSubscribedByUser(user.id)) {
                data.my_subscribe_pages.push(await pageDAO.getPageBasicInfo(id));
            }
        }
        else {
            req.session.user = null;
        }
    }

    data.categories = await categoryDAO.getCategoryList();
    data.tags = await tagDAO.getTagList();

    return data;
}


router.get("/favicon.ico", function(req, res) {
    res.status(404).end();
});

router.get("/", asyncHandler(async (req, res) => {
    let data = await sideBarData(req);

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

    res.render("main", data);
}));


// 카테고리별 보기
router.get("/category/:categoryId", asyncHandler(async (req, res) => {
    let data = await sideBarData(req);

    let pagesByCategory = await pageDAO.getPageIdListByCategoryId(req.params.categoryId);
    data.pagesByCategory = [];
    for (let page of pagesByCategory) {
        data.pagesByCategory.push(await pageDAO.getPageBasicInfo(page));
    }
    data.category = await categoryDAO.getCategory(req.params.categoryId);

    res.render("category-view", data);
}));


// 검색
router.get("/search", asyncHandler(async (req, res) => {
    let data = await sideBarData(req);

    data.pagesSearchedByName = [];
    for (let pageId of await pageDAO.getPageIdListSearchByName(req.query.keyword)) {
        data.pagesSearchedByName.push(await pageDAO.getPageBasicInfo(pageId));
    }
    data.keyword = req.query.keyword;

    res.render("search-view", data);
}));


// 태그별 보기
router.get("/tag/:tagId", asyncHandler(async (req, res, next) => {
    let data = await sideBarData(req);
    data.tag = await tagDAO.getTag(req.params.tagId);

    if (data.tag === null)
        return next();

    data.postsByTag = await postDAO.getPostsByTagName(data.tag.name);
    data.crypto = crypto;
    res.render("tag", data);
}));


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
    await pageDAO.createPage(req.session.user.id, req.body.animal_name, req.body.description, req.body.category, req.body.profile || null);
    let pageId = await pageDAO.getPageIdOfUser(req.session.user.id);
    if (pageId) {
        req.session.user.my_page_id = pageId;
    }
    res.redirect("/page/" + pageId);
}));


// 포인트 충전
router.get("/point", asyncHandler(async (req, res) => {
    if (req.session.user) {
        res.render("payment");
    }
    else {
        res.redirect("/login");
    }
}));

router.post("/point", asyncHandler(async (req, res) => {
    if (req.session.user) {
        await userDAO.addPointToUser(req.session.user.id, req.body.amount);
        req.session.user.point = (await userDAO.getUser(req.session.user.id)).point;
        req.session.message = "포인트가 충전되었습니다.";
        res.redirect("/");
    }
    else {
        res.redirect("/point");
    }
}));

router.post("/point-kakaopay", asyncHandler(async (req, res) => {
    if (req.session.user && req.body.amount && req.body.amount > 0) {
        request({
            url: "https://kapi.kakao.com/v1/payment/ready",
            method: "POST",
            headers: {
                Authorization: "KakaoAK " + apiConfig.kakaoAdminKey
            },
            form: {
                cid: "TC0ONETIME",
                partner_order_id: "partner_order_id",
                partner_user_id: "partner_user_id",
                item_name: "Animal Point",
                quantity: req.body.amount,
                total_amount: req.body.amount,
                tax_free_amount: req.body.amount,
                approval_url: "http://" + apiConfig.host + "/point-kakaopay-approve",
                cancel_url: "http://" + apiConfig.host + "/point",
                fail_url: "http://" + apiConfig.host + "/point",
            }
        }, function(err, response, body) {
            let json = JSON.parse(body);
            console.log(json);
            if (json.next_redirect_pc_url && json.tid) {
                req.session.tid = json.tid;
                req.session.ready_to_buy = req.body.amount;
                res.redirect(json.next_redirect_pc_url);
            }
            else {
                req.session.message = "결제 요청 실패";
                res.redirect("/point");
            }
        });
    }
    else {
        req.session.message = "결제 요청 실패";
        res.redirect("/point");
    }
}));

router.get("/point-kakaopay-approve", asyncHandler(async (req, res) => {
    if (req.session.user && req.session.user.id && req.session.tid && req.session.ready_to_buy) {
        let tid = req.session.tid;
        let ready_to_buy = req.session.ready_to_buy;

        request({
           url: "https://kapi.kakao.com/v1/payment/approve",
           method: "POST",
           headers: {
               Authorization: "KakaoAK " + apiConfig.kakaoAdminKey
           },
           form: {
               cid: "TC0ONETIME",
               tid: tid,
               partner_order_id: "partner_order_id",
               partner_user_id: "partner_user_id",
               pg_token: req.query.pg_token,
           }
        }, function(err, response, body) {
            if (response && response.statusCode === 200) {
                userDAO.addPointToUser(req.session.user.id, ready_to_buy)
                    .then((value) => {
                        return userDAO.getUser(req.session.user.id);
                    })
                    .then((value) => {
                        req.session.user.point = value.point;
                        req.session.message = "포인트가 충전되었습니다.";
                        res.redirect("/");
                    })
                    .catch((err) => {
                        req.session.message = "결제 승인 실패";
                        res.redirect("/point");
                    });
            }
            else {
                req.session.message = "결제 승인 실패";
                res.redirect("/point");
            }
        });

        req.session.tid = null;
        req.session.ready_to_buy = null;
    }
    else {
        req.session.message = "결제 승인 실패";
        res.redirect("/point");
    }
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

    if (acceptedUser) {
        let pageId = await pageDAO.getPageIdOfUser(acceptedUser.id);
        req.session.user.my_page_id = pageId;
    }

    if (!acceptedUser) {
        req.session.message = "아이디 또는 비밀번호를 틀렸습니다.";
        res.render("login");
    }
    else {
        res.redirect("/");
    }
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

    if (!user.email || !user.password || !user.nickname || !req.body.password2) {
        req.session.message = "모든 필드를 입력해주세요.";
        return res.render("signup");
    }

    if (user.password !== req.body.password2) {
        req.session.message = "비밀번호가 일치하지 않습니다.";
        return res.render("signup");
    }

    if (await userDAO.checkExistedEmail(user.email)) {
        req.session.message = "이미 가입된 이메일입니다.";
        return res.render("signup");
    }

    if (await userDAO.checkExistedNickname(user.nickname)) {
        req.session.message = "이미 존재하는 닉네임입니다.";
        return res.render("signup");
    }

    if (await userDAO.createUser(user)) {
        req.session.user = (await userDAO.authUser(user)) || null;
        req.session.user.my_page_id = null;
        res.redirect("/");
    }

    req.session.message = "가입 실패";
    res.render("signup");
}));


module.exports = router;
