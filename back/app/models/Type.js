import {Model, DataTypes} from 'sequelize';
import {sequelize} from '../database/connection.js' 

class Type extends Model {}

Type.init(
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
        color: {
            type: DataTypes.TEXT,
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
        tableName: 'type',
    }
);

export {Type};