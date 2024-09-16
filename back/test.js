import 'dotenv/config';
import {Pokemon, Type, Team} from './app/models/associations.js';

Pokemon.findAll({
    include: {association: 'types'}
}).then(response => console.log(response)); 

