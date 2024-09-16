import { Router } from 'express';
import {catchErrors} from '../middlewares/catchErrors.js';
import {pokemonController} from '../controllers/pokemonController.js';
const pokemonRouter = Router();

pokemonRouter.get('/', catchErrors(pokemonController.index)); 

pokemonRouter.get('/:id(\\d+)', catchErrors(pokemonController.show)); 

export {pokemonRouter}