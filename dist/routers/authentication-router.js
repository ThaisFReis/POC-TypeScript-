"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authentication_controller_1 = require("../controllers/authentication-controller");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter
    .post('/login', authentication_controller_1.Login);
