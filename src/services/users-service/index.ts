import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import UserRepository from '@/repositories/user-repository';
import { createUserSchema } from '@/schemas';

// Create a new user
export async function createUser({ email, name, password }: CreateUserParams): Promise<User> {

    // Validate the user data
    const { error } = createUserSchema.validate({ email, name, password });
    if (error) {
        throw error;
    }

    // Check if the user already exists
    const user = await UserRepository.findUserByEmail(email);
    if (user) {
        throw new Error('User already exists');
    }

    // Has email and password?
    if (!email || !password) {
        throw new Error('Missing email or password');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await UserRepository.createUser(email, name, hashedPassword);

    return newUser;
}

// Update a user by ID
async function updateUser(userId: number, data: UpdateUserParams): Promise<User> {
    const user = await UserRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const updatedUser = await UserRepository.updateUserById(userId, data);
    return updatedUser;
}

// Delete a user by ID
async function deleteUser(userId: number): Promise<User> {
    const user = await UserRepository.findUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const deletedUser = await UserRepository.deleteUserById(userId);
    return deletedUser;
}

export type CreateUserParams = Pick<User, 'email' | 'name' | 'password'>;
export type UpdateUserParams = Partial<CreateUserParams>;

const UserService = {
    createUser,
    updateUser,
    deleteUser
};

export default UserService;