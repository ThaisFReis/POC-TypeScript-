import { Router } from 'express';

import { createUser, getAllUsers, deleteUser, updateUser } from '@/controllers/users-controller';
import { authenticate } from '@/middleware/authentication-middleware';

const usersRouter = Router();

usersRouter
    .post('/register', createUser)
    .get('/', getAllUsers)
    .all('*', authenticate)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser);

export { usersRouter };