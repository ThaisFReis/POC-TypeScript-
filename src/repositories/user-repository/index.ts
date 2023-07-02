import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

//  Create a new user
async function createUser(email: string, name: string, password: string) {
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password,
        },
    });
    return user;
}

// Get all users
async function getAllUsers() {
    const users = await prisma.user.findMany();
    return users;
}

// Find a user by email
async function findUserByEmail(email: string) {
    const user = await prisma.user.findFirst({
        where: {
            email,
        },
    });
    return user;
}

// Find a user by id
async function findUserById(id: number) {
    const user = await prisma.user.findFirst({
        where: {
            id,
        },
    });
    return user;
}

// Update a user by id
async function updateUserById(userId: number, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
        where: {
            id: userId,
        },
        data,
    });
    return user;
}


// Delete a user by id
async function deleteUserById(id: number) {
    await prisma.session.deleteMany({
        where: {
            userId: id,
        },
      });

      
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    return user;
}

const UserRepository = {
    createUser,
    getAllUsers,
    findUserByEmail,
    findUserById,
    updateUserById,
    deleteUserById,
};

export default UserRepository;