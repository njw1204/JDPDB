"use strict";
const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const logger = require("morgan");
const mainRouter = require("./router/main-router");


const app = express();
app.set("view engine", "ejs");
app.set("views", "./view");
app.use(logger("dev"));
app.use(helmet());
app.use(compression());
app.use(express.static("static"));
app.use(express.json({limit: "100mb"}));
app.use(express.urlencoded({limit: "100mb", extended: true}));


app.use("/", mainRouter);
app.use(function(req, res, next) {
    res.status(404).render("error/404");
});
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send("Internal Server Error");
});


app.listen(3000, function () {
    console.log("Listening on port 3000.. ( http://127.0.0.1:3000 )");
});
