import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import { prisma } from '@/config';

// Check if the user is authenticated
export async function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {

    // Get the token from the header
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
        return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
    }

    // Verify the token
    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

        // Check if the session exists
        const session = await prisma.session.findUnique({
            where: {
                token
            },
            include: {
                User: true
            }
        });

        if (!session) {
            return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
        }

        req.userId = userId;

        next();
    } catch (error) {
        return res.status(httpStatus.UNAUTHORIZED).send('Unauthorized');
    }
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
    userId: number;
};