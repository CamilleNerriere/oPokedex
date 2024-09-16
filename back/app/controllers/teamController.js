import {Team} from '../models/associations.js';

const teamController = {
    async index(req, res) {
        const teams = await Team.findAll({
            include: [
                {association: 'pokemons'}, 
            ],
        });

        res.json(teams); 
    }, 
    async show(req, res) {
        const {id} = req.params;
        const team = await Team.findByPk(id, {
            include: [
                {association: 'pokemons'}, 
            ],
        });

        res.json(team); 
        
    }
}

export {teamController}