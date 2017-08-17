import { Router } from 'express';
//import defaultRouter from 'src/server/routes/default';
//import APIRouter from 'src/server/routes/api';

const router = Router({ mergeParams: true });

router.use('/', (req, res, next) => { res.send('It works'); next(); });
//router.use('/', defaultRouter);
router.use('/s', (req, res, next) => { res.send('It works'); next(); });
//router.use('/api', APIRouter);

export default router;