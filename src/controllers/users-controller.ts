import { Request, Response } from 'express';
import httpStatus from 'http-status';
import userService from '@/services/users-service';

// Create a new user
export async function createUser(req: Request, res: Response) {
    const { email, password, name } = req.body;

    try {
        const user = await userService.createUser({ email, password, name });
        return res.status(httpStatus.CREATED).json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
}

// Get all users
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a user
export async function updateUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    const data = req.body;

    try {
        const updatedUser = await userService.updateUser(userId, data);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Delete a user
export async function deleteUser(req: Request, res: Response) {
    const userId = parseInt(req.params.id);

    try {
        const deletedUser = await userService.deleteUser(userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}