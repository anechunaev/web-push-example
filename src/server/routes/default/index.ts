import { Router } from 'express';
import { pageTemplateHandler } from 'src/server/middlewares';

const router = Router({ mergeParams: true });

router.all('/', pageTemplateHandler);

export default router;