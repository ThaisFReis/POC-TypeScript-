import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService from '@/services/authentication-service';
import { loginUserSchema } from '@/schemas';

// Login a user
export async function Login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid email or password' });
    }

    const { error } = loginUserSchema.validate({ email, password });

    if (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }

    try {
        const user = await authenticationService.authenticate({ email, password });

        return res.status(httpStatus.OK).json(user);

    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
}