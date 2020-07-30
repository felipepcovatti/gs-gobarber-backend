import { Router } from 'express';

import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const router = Router();

router.use('/appointments', appointmentsRouter);
router.use('/users', usersRouter);

export default router;
