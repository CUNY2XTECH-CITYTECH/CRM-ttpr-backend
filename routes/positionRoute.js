import {Router} from 'express';
import { createPosition,  getPosition } from '../controllers/positionController.js';
const PositionRouter = Router();
PositionRouter.post('/create', createPosition);
PositionRouter.get('/', getPosition);
export default PositionRouter;

