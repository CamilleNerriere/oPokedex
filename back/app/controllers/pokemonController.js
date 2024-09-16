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
        
    }, 
    async compare(req, res) {
        const {firstId, secondId} = req.params;

        const pokemons = await Pokemon.findAll({
            where: {
                id:[firstId, secondId]
            }
        });

        res.json(pokemons);

    }, 
    async searchByName(req, res) {
        const {name} = req.params;

        const capitalizedName = name.charAt(0).toUpperCase()+ name.slice(1).toLowerCase(); 

        const pokemon = await Pokemon.findOne({
            where: {name: capitalizedName}
        })

        res.json(pokemon);
    }, 
    async vote(req, res, next){
        const {id} = req.params;

        const pokemonToUpdate = await Pokemon.findByPk(id);

        if(!pokemonToUpdate){
            return next();
        }

        let vote = pokemonToUpdate.vote;
        vote++

        const updatedPokemon = await pokemonToUpdate.update({
            vote,
        });

        res.json(updatedPokemon);
    },
    async showVotes(req, res, next){
        const {id} = req.params;

        const pokemon = await Pokemon.findByPk(id);

        if(!pokemon){
            return next();
        }

        const vote = pokemon.vote;

        res.json(vote);
    },
    async showPodium(req, res){
        const pokemons = await Pokemon.findAll({
            order: [['vote', 'DESC']],
            limit: 10,

        });

        res.json(pokemons);
    }
}

export {pokemonController}