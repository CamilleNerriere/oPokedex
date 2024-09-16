import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/connection.js' 

class Pokemon extends Model {}

Pokemon.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
        }, 
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        }, 
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        atk: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        def: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        atk_spe: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        def_spe: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }, 
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
        tableName: 'pokemon',
    }
);

export {Pokemon};