import {Model, DataTypes, literal} from 'sequelize';
import {sequelize} from '../database/connection.js' 

class TeamPokemon extends Model {}

TeamPokemon.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        }, 
        pokemon_id: {
            type: DataTypes.INTEGER,
        },
        team_id: {
            type: DataTypes.INTEGER,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
        updated_at: DataTypes.DATE,
    }, 
    {
        sequelize: sequelize,
        tableName: 'team_pokemon',
        indexes: [
            {
                unique: true,
                fields: ['pokemon_id', 'team_id']
            }
        ],    
    }
);

export {TeamPokemon};