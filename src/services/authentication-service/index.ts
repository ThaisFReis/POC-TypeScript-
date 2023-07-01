import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import { exclude } from '@/utils/prisma-utils';

async function authenticate(params: LoginParams): Promise<LoginResult> {
    const { email, password } = params;

    // Check if user exists
    const user = await userRepository.findUserByEmail(email);

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    // Create a token
    const token = await createSession(user.id);

    return {
        user: exclude(user, 'password'),
        token
    };
}


// Create a session
async function createSession(userId: number): Promise<string> {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    await sessionRepository.createSession({
        token,
        User: { connect: { id: userId } },
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000)
    })

    return token;
}

export type LoginParams = Pick<User, 'email' | 'password'>;

type LoginResult = {
    user: Pick<User, 'id' | 'email'>;
    token: string;
}

const AuthenticationService = {
    authenticate
};

export default AuthenticationService;