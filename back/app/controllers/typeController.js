import {Type} from '../models/associations.js';

const typeController = {
    async index(req, res) {
        const types = await Type.findAll({
            include: [
                {association: 'pokemons'}, 
            ],
        });

        res.json(types); 
    }, 
    async show(req, res) {
        const {id} = req.params;
        const type = await Type.findByPk(id, {
            include: [
                {association: 'pokemons'}, 
            ],
        }
    );

        res.json(type); 
        
    }
}

export {typeController}