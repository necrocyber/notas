"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//import * as helmet from 'helmet'
var cors = require("cors");
var v1_1 = require("./routes/v1");
var mian_1 = require("./config/mian");
// Iniciar Express
var app = express();
// Iniciar Mongoose
mongoose.connect(mian_1.default.db);
// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors());
// Routers
v1_1.default(app);
// Iniciar Server
var server;
if (process.env.NODE_ENV !== mian_1.default.test_env) {
    server = app.listen(mian_1.default.port, function () {
        console.log("Server escuchando en el puerto " + mian_1.default.port);
    });
}
else {
    server = app.listen(mian_1.default.test_port, function () {
        console.log("Server escuchando en el puerto " + mian_1.default.test_port);
    });
}
exports.default = server;
//# sourceMappingURL=server.js.map