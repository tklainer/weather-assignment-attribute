import { Router } from 'express';
import weatherRouter from './weatherRouter';

const router = Router();

router.use('/weather', weatherRouter);

export default router;
