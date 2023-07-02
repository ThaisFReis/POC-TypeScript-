import { Prisma, Session } from '@prisma/client';
import { prisma } from '@/config';

// Create a session
export async function createSession(sessionData: Prisma.SessionCreateInput): Promise<Session> {
    const createdSession = await prisma.session.create({
        data: sessionData,
    });

    return createdSession;
}

// Find a session by token
async function findSessionByToken(token: string, select?: Prisma.SessionSelect) {
    const session = await prisma.session.findFirst({
        where: {
            token,
        },
        select,
    });
    return session;
}

// Delete a session by token
async function deleteSessionByToken(token: string) {
    const session = await prisma.session.delete({
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

export default SessionRepository;
