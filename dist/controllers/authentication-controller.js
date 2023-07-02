"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
const http_status_1 = __importDefault(require("http-status"));
const authentication_service_1 = __importDefault(require("../services/authentication-service"));
const schemas_1 = require("../schemas");
// Login a user
async function Login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(http_status_1.default.BAD_REQUEST).json({ error: 'Invalid email or password' });
    }
    const { error } = schemas_1.loginUserSchema.validate({ email, password });
    if (error) {
        return res.status(http_status_1.default.BAD_REQUEST).json({ error: error.message });
    }
    try {
        const user = await authentication_service_1.default.authenticate({ email, password });
        return res.status(http_status_1.default.OK).json(user);
    }
    catch (error) {
        // If the error is unthaorized, return 401 and the error message
        if (error.message === 'Unauthorized') {
            return res.status(http_status_1.default.UNAUTHORIZED).json("Invalid email or password");
        }
        return res.status(http_status_1.default.BAD_REQUEST).json({ error: error.message });
    }
}
exports.Login = Login;
