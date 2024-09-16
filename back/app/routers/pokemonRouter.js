import { Router } from 'express';
import {catchErrors} from '../middlewares/catchErrors.js';
import {pokemonController} from '../controllers/pokemonController.js';
import {joiValidator} from '../middlewares/joiValidator.js';

const pokemonRouter = Router();

pokemonRouter.get('/', catchErrors(pokemonController.index)); 

pokemonRouter.get('/:id(\\d+)', catchErrors(pokemonController.show)); 

pokemonRouter.get('/:firstId(\\d+)/:secondId(\\d+)', catchErrors(pokemonController.compare)); 

pokemonRouter.get('/:name', joiValidator.validatePokemonName, catchErrors(pokemonController.searchByName));

pokemonRouter.patch('/vote/:id(\\d+)', catchErrors(pokemonController.vote)); 

pokemonRouter.get('/vote/:id(\\d+)', catchErrors(pokemonController.showVotes)); 

pokemonRouter.get('/vote/podium', catchErrors(pokemonController.showPodium)); 


export {pokemonRouter}