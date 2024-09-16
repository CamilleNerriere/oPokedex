import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/connection.js' 

class Team extends Model {}

Team.init(
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
        description: {
            type: DataTypes.TEXT,
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
        tableName: 'team',
    }
);

export {Team};