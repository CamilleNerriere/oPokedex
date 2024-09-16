import { Router } from 'express';
import {pokemonRouter} from './pokemonRouter.js';
import {teamRouter} from './teamRouter.js'; 
import {typeRouter} from './typeRouter.js'; 

const router = Router();


router.use('/pokemons', pokemonRouter);
router.use('/teams', teamRouter);
router.use('/types', typeRouter); 

export { router };