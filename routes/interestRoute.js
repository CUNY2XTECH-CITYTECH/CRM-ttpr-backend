import { Router } from 'express';
import { getInterests } from '../controllers/interestController.js';

const interestRouter = Router();
interestRouter.get('/:id', getInterests);

export default interestRouter;