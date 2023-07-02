"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = __importDefault(require("../../repositories/user-repository"));
const schemas_1 = require("../../schemas");
// Create a new user
async function createUser({ email, name, password }) {
    // Validate the user data
    const { error } = schemas_1.createUserSchema.validate({ email, name, password });
    if (error) {
        throw error;
    }
    // Check if the user already exists
    const user = await user_repository_1.default.findUserByEmail(email);
    if (user) {
        throw new Error('User already exists');
    }
    // Has email and password?
    if (!email || !password) {
        throw new Error('Missing email or password');
    }
    // Hash the password
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    // Create the user
    const newUser = await user_repository_1.default.createUser(email, name, hashedPassword);
    return newUser;
}
exports.createUser = createUser;
// Get all users
async function getAllUsers() {
    const users = await user_repository_1.default.getAllUsers();
    return users;
}
// Update a user by ID
async function updateUser(userId, data) {
    const user = await user_repository_1.default.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const updatedUser = await user_repository_1.default.updateUserById(userId, data);
    return updatedUser;
}
// Delete a user by ID
async function deleteUser(userId) {
    const user = await user_repository_1.default.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    const deletedUser = await user_repository_1.default.deleteUserById(userId);
    return deletedUser;
}
const UserService = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
exports.default = UserService;
