import { Router } from 'express';

import { createUser, deleteUser, updateUser } from '@/controllers/users-controller';
import { authenticate } from '@/middleware/authentication-middleware';

const usersRouter = Router();

usersRouter
    .post('/register', createUser)
    .all('*', authenticate)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser);

export { usersRouter };