import express from 'express';
import { AuthControllers } from './article.controller';

const router = express.Router();

router.post('/', AuthControllers.createArticle);
router.get('/', AuthControllers.getAllCategories);
router.delete('/:id', AuthControllers.deleteCategory);
router.get('/:id/summary', AuthControllers.summarizeArticles);

export const ArticleRoutes = router;
