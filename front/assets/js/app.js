import {pokemonsModule} from "./pokemons/pokemons.module.js"; 
import {typesModule} from "./types/types.modules.js";

const app = {
    async init(e){
        try {
            pokemonsModule.init(); 
            typesModule.init();
        } catch (error) {
            console.log(error);
        }
    }
}

document.addEventListener("DOMContentLoaded", app.init); 






