import { Router } from 'express';
//import { compose } from 'compose-middleware';

import findUser from './find';

const router = Router({ mergeParams: true });

router.get('/', findUser);
//router.get('/?login=$email', findUser);
router.put('/');

router.get('/:email', findUser);
router.post('/:email');
router.delete('/:email');

export default router;