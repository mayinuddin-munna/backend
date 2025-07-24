import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ArticleRoutes } from '../modules/article/article.route';

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes
  },
  {
    path: '/articles',
    route: ArticleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
