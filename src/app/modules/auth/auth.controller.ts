import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { AuthServices } from './auth.service';

const signupUser = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.signupUserIntoDB(req.body, res);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User is created successfully',
        data: result,
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { user, token } = await AuthServices.loginUserIntoDB(req.body, res);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: {
            ...user,
            token,
        },
    });
});


export const AuthControllers = {
    signupUser,
    loginUser
};
