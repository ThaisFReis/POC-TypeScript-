import { Router } from 'express';

import { Login } from '@/controllers/authentication-controller';

const authRouter = Router();

authRouter
    .post('/login', Login);

export { authRouter };