"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const users_service_1 = __importDefault(require("../services/users-service"));
// Create a new user
async function createUser(req, res) {
    const { email, password, name } = req.body;
    try {
        const user = await users_service_1.default.createUser({ email, password, name });
        return res.status(http_status_1.default.CREATED).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).json({ error: error.message });
    }
}
exports.createUser = createUser;
// Update a user
async function updateUser(req, res) {
    const userId = parseInt(req.params.id);
    const data = req.body;
    try {
        const updatedUser = await users_service_1.default.updateUser(userId, data);
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.updateUser = updateUser;
// Delete a user
async function deleteUser(req, res) {
    const userId = parseInt(req.params.id);
    try {
        const deletedUser = await users_service_1.default.deleteUser(userId);
        res.json(deletedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.deleteUser = deleteUser;
