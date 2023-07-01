"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../config");
//  Create a new user
async function createUser(email, name, password) {
    const user = await config_1.prisma.user.create({
        data: {
            email,
            name,
            password,
        },
    });
    return user;
}
// Find a user by email
async function findUserByEmail(email) {
    const user = await config_1.prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
}
// Find a user by id
async function findUserById(id) {
    const user = await config_1.prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
}
// Update a user by id
async function updateUserById(userId, data) {
    const user = await config_1.prisma.user.update({
        where: {
            id: userId,
        },
        data,
    });
    return user;
}
// Delete a user by id
async function deleteUserById(id) {
    const user = await config_1.prisma.user.delete({
        where: {
            id,
        },
    });
    return user;
}
const UserRepository = {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserById,
    deleteUserById,
};
exports.default = UserRepository;
