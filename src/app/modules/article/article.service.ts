
import config from "../../config";
import AppError from "../../errors/AppError";
import prisma from "../../lib/prisma";
import { Article } from "./article.interface";
import { OpenAI } from 'openai';

const createArticleIntoDB = async (data: Article) => {
    const { title, body, tags, userId } = data;

    if (!userId) {
        throw new AppError(400, 'User ID is required to create an article');
    }

    const result = await prisma.article.create({
        data: {
            title,
            body,
            tags,
            userId,
        },
    });
    console.log(result);

    return result;
};

const getAllArticleFromDB = async (searchTerm?: string) => {
    const result = await prisma.article.findMany({
        where: searchTerm
            ? {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive',
                        },
                    },
                    {
                        tags: {
                            has: searchTerm,
                        },
                    },
                ],
            }
            : undefined,
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return result;
};

const deleteArticleFromDB = async (id: string) => {
    const result = await prisma.article.delete({
        where: {
            id
        }
    });
    return result;
};

const openai = new OpenAI({ apiKey: config.openai_api_key });

const summarizeArticle = async (articleText: string) => {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'Summarize the following article:' },
            { role: 'user', content: articleText },
        ],
    });

    return completion.choices[0].message.content;
};

export const ArticleServices = {
    createArticleIntoDB,
    getAllArticleFromDB,
    deleteArticleFromDB,
    summarizeArticle
};
