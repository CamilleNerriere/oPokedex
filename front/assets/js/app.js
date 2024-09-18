import {pokemonsModule} from "./pokemons/pokemons.module.js"; 

const app = {
    async init(e){
        try {
            console.log('Init fonction');
            pokemonsModule.init(); 
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener("DOMContentLoaded", app.init); 






