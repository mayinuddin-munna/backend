import httpStatus from 'http-status';
import { Request, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ArticleServices } from './article.service';
import OpenAI from 'openai';
import prisma from '../../lib/prisma';
import AppError from '../../errors/AppError';

const createArticle = catchAsync(async (req: Request, res: Response) => {
    const result = await ArticleServices.createArticleIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Article is created successfully',
        data: result,
    });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
    const { search } = req.query

    const result = await ArticleServices.getAllArticleFromDB(search as string | undefined);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Article is retrieved successfully',
        data: result,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ArticleServices.deleteArticleFromDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete single article successfully',
        data: result,
    });
});

const summarizeArticles = catchAsync(async (req: Request, res: Response) => {
    const article = await prisma.article.findUnique({ where: { id: req.params.id } });

    if (!article) {
        throw new AppError(404, 'Not found');
    }

    const summary = await ArticleServices.summarizeArticle(article.body);
    res.json({ summary });
});

export const AuthControllers = {
    createArticle,
    getAllCategories,
    deleteCategory,
    summarizeArticles
};
