import { Router } from 'express';
import UsersRouter from 'src/server/routes/api/v1/Users';

const router = Router({ mergeParams: true });

router.use('/Users', UsersRouter);

export default router;