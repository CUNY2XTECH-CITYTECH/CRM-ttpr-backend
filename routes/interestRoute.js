import { Router } from 'express';
import { createInterest, getInterests } from '../controllers/interestController.js';

const interestRouter = Router();
interestRouter.get('/:id', getInterests);
interestRouter.post('/create', createInterest);

export default interestRouter;