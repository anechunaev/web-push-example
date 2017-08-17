import { Router } from 'express';
import APIv1 from 'src/server/routes/api/v1';

const router = Router({ mergeParams: true });

router.all('/', (req, res) => res.json({message: 'ok'}));
router.use('/v1', APIv1);

export default router;