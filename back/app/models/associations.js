import {sequelize} from '../database/connection.js';
import {Pokemon} from './Pokemon.js';
import {Team} from './Team.js';
import {Type} from './Type.js';
import {PokemonType} from './PokemonType.js';
import {TeamPokemon} from './TeamPokemon.js';

Pokemon.belongsToMany(Type, {
    as: 'types',
    through: PokemonType, 
    foreignKey: 'pokemon_id',
    otherKey: 'type_id',
}); 

Type.belongsToMany(Pokemon, {
    as: 'pokemons', 
    through: PokemonType, 
    foreignKey: 'type_id', 
    otherKey: 'pokemon_id',
}); 

Pokemon.belongsToMany(Team, {
    as: 'teams',
    through: TeamPokemon, 
    foreignKey: 'pokemon_id',
    otherKey: 'team_id',
}); 

Team.belongsToMany(Pokemon, {
    as: 'pokemons', 
    through: TeamPokemon, 
    foreignKey: 'team_id', 
    otherKey: 'pokemon_id',
}); 

export {Pokemon, Team, Type, PokemonType, TeamPokemon, sequelize};