import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/connection.js' 

class PokemonType extends Model {}

PokemonType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        }, 
        pokemon_id: {
            type: DataTypes.INTEGER,
        },
        type_id: {
            type: DataTypes.INTERGER,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: literal('CURRENT_TIMESTAMP'),
        },
        updated_at: DataTypes.DATE,
    }, 
    {
        sequelize: sequelize(),
        tableName: 'pokemon_type',
        indexes: [
            {
                unique: true,
                fields: ['pokemon_id', 'type_id']
            }
        ],    
    }
);

export {PokemonType};