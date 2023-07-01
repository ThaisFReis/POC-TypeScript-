"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controller_1 = require("../controllers/users-controller");
const authentication_middleware_1 = require("../middleware/authentication-middleware");
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter
    .post('/register', users_controller_1.createUser)
    .all('*', authentication_middleware_1.authenticate)
    .put('/:id', users_controller_1.updateUser)
    .delete('/:id', users_controller_1.deleteUser);
