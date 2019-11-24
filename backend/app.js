"use strict";
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("morgan");
const session = require("express-session");
const prettyJsonToHtml = require("json-pretty-html").default;
const mainRouter = require("./router/main-router");
const pageRouter = require("./router/page-router");
const fileRouter = require("./router/file-router");


const app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", "./view");
app.use(logger("dev"));
app.use(helmet());
app.use(compression());
app.use(express.static("static"));
app.use("/media", express.static("media"));
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({limit: "100mb", extended: true}));
app.use(session({
    secret: "JDPDB",
    resave: false,
    saveUninitialized: true,
}));
app.use(function(req, res, next) {
    // ejs에서 session 접근 가능하도록 설정
    res.locals.session = req.session;
    next();
});


app.use("/", mainRouter);
app.use("/page", pageRouter);
app.use("/file", fileRouter);
app.use(function(req, res, next) {
    res.status(404).render("error/404");
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send("<head><link rel='stylesheet' href='/css/json.css'></head><h1>500 Internal Server Error</h1>" + prettyJsonToHtml(err));
});


app.listen(app.get("port"), function() {
    console.log("Listening on port " + app.get("port") + ".. ( http://127.0.0.1:" + app.get("port") + " )");
});
