import { Router } from 'express';
import {catchErrors} from '../middlewares/catchErrors.js';
import {typeController} from '../controllers/typeController.js';
const typeRouter = Router();

typeRouter.get('/', catchErrors(typeController.index)); 

typeRouter.get('/:id(\\d+)', catchErrors(typeController.show)); 

export {typeRouter}