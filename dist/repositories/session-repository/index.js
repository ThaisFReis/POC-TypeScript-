"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const config_1 = require("../../config");
// Create a session
async function createSession(sessionData) {
    const createdSession = await config_1.prisma.session.create({
        data: sessionData,
    });
    return createdSession;
}
exports.createSession = createSession;
// Find a session by token
async function findSessionByToken(token, select) {
    const session = await config_1.prisma.session.findFirst({
        where: {
            token,
        },
        select,
    });
    return session;
}
// Delete a session by token
async function deleteSessionByToken(token) {
    const session = await config_1.prisma.session.delete({
        where: {
            token,
        },
    });
    return session;
}
const SessionRepository = {
    createSession,
    findSessionByToken,
    deleteSessionByToken
};
exports.default = SessionRepository;
