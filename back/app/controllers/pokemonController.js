import {Pokemon} from '../models/associations.js';

const pokemonController = {
    async index(req, res) {
        const pokemons = await Pokemon.findAll({
            include: [
                {association: 'types'}, 
                {association: 'teams'}
            ],
        });

        res.json(pokemons); 
    }, 
    async show(req, res) {
        const {id} = req.params;
        const pokemon = await Pokemon.findByPk(id, {
            include: [
                {association: 'types'}, 
                {association: 'teams'}
            ],
        });

        res.json(pokemon); 
        
    }
}

export {pokemonController}