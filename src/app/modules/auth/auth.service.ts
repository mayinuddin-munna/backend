import prisma from '../../lib/prisma';
import bcrypt from 'bcrypt';
import { User } from './auth.interface';
import generateToken from '../../utils/generateToken';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const signupUserIntoDB = async (data: User, resData: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const result = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
        }
    });
    const token = generateToken(resData, result.id);
    return {
        ...result,
        token
    };
};

export const loginUserIntoDB = async (
    data: { email: string; password: string },
    res: any
) => {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    const token = generateToken(res, user.id);

    const { password: _pw, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword,
        token,
    };
};

export const AuthServices = {
    signupUserIntoDB,
    loginUserIntoDB
};
