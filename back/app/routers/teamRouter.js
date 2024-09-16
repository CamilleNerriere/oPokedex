import { Router } from 'express';
import {catchErrors} from '../middlewares/catchErrors.js';
import {teamController} from '../controllers/teamController.js';
import {joiValidator} from '../middlewares/joiValidator.js';
const teamRouter = Router();

teamRouter.get('/', catchErrors(teamController.index)); 

teamRouter.get('/:id(\\d+)', catchErrors(teamController.show)); 

teamRouter.post('/', joiValidator.validateTeam, catchErrors(teamController.store));

teamRouter.patch('/:id(\\d+)', joiValidator.validateTeam, catchErrors(teamController.update));

teamRouter.post('/:pokemon_id(\\d+)/:team_id(\\d+)', catchErrors(teamController.storePokemon));

teamRouter.delete('/:pokemon_id(\\d+)/:team_id(\\d+)', catchErrors(teamController.deletePokemon));

export {teamRouter}