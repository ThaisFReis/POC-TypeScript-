"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository"));
const session_repository_1 = __importDefault(require("../../repositories/session-repository"));
const prisma_utils_1 = require("../../utils/prisma-utils");
async function authenticate(params) {
    const { email, password } = params;
    // Check if user exists
    const user = await user_repository_1.default.findUserByEmail(email);
    if (!user) {
        throw new Error('Invalid credentials');
    }
    // Check if the password is correct
    const passwordMatch = await bcrypt_1.default.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }
    // Create a token
    const token = await createSession(user.id);
    return {
        user: (0, prisma_utils_1.exclude)(user, 'password'),
        token
    };
}
// Create a session
async function createSession(userId) {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await session_repository_1.default.createSession({
        token,
        User: { connect: { id: userId } },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    });
    return token;
}
const AuthenticationService = {
    authenticate
};
exports.default = AuthenticationService;
