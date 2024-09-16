import {Team, TeamPokemon} from '../models/associations.js';

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
        
    }, 
    async store(req, res) {
        const {name, description} = req.body; 

        const team = await Team.create({name, description}); 

        res.status(201).json(team); 

    }, 
    async update(req, res, next) {
        const {id} = req.params;
        const {name, description} = req.body; 

        const teamToUpdate = await Team.findByPk(id); 

        if(!teamToUpdate){
            return next();
        }

        const updatedTeam = await teamToUpdate.update({
            name: name || teamToUpdate.name, 
            description: description || teamToUpdate.description,
        });

        res.json(updatedTeam);
    }, 
    async storePokemon(req, res){
        const {pokemon_id, team_id} = req.params; 

        const addedPokemon = await TeamPokemon.create({pokemon_id, team_id});

        res.status(201).json(addedPokemon); 
    }, 
    async deletePokemon(req,res, next){
        const {pokemon_id, team_id} = req.params; 

        const teamPokemonAssociation = await TeamPokemon.findOne({
            where: {pokemon_id, team_id}
        })

       if(!teamPokemonAssociation){
            return next();
       }

       await teamPokemonAssociation.destroy(); 

       return res.sendStatus(204); 
    }
}

export {teamController}