import { Router } from 'express';
import { createInterest, getInterests, deleteInterest } from '../controllers/interestController.js';

const interestRouter = Router();
interestRouter.get('/:id', getInterests);
interestRouter.post('/create', createInterest);
interestRouter.delete('/:id', deleteInterest);


export default interestRouter;