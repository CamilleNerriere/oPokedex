import {typesApi} from "./types.api.js";
import {pokemonsModule} from "../pokemons/pokemons.module.js";
import {colorGestion} from "../utils/colorGestion.js"

const typesModule = {
    async init(){
        // event listener afficher les types :
        const typeBtn = document.getElementById('typesLink');

        // je vais appeler showOrHideTypes(event)
        
        typeBtn.addEventListener('click', (event) => {typesModule.showOrHideTypes(event)});
    }, 
    async showOrHideTypes(event){

        event.preventDefault();

        const parent = document.querySelector('.list__items');

        if (parent.classList.contains('active-types')){
            typesModule.removeTypesOfDOM();
        } else {
            try {
                const types = await typesApi.getTypes();
        
                for (const type of types) {
                    typesModule.addTypesToDOM(type); 
                }
            } catch (error) {
            console.log(error)
            } 
        }

    }, 
    addTypesToDOM(type){
        const itemTemplate = document.getElementById('itemsListTemplate');
        const clone = itemTemplate.content.cloneNode(true);

        const typeBtn = clone.querySelector('.typeBtn');
        typeBtn.style.backgroundColor = `#${type.color}`;
        typeBtn.style.border = `#${type.color}`;
         typeBtn.style.color = colorGestion.hexColor(type.color);

        typeBtn.textContent = type.name;
        typeBtn.closest('a').href = `${typesApi.baseUrl}${type.id}`

        // Listener pour afficher par type
        typeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            typesModule.showType(type.id)}
        );
        
        const parent = document.querySelector('.list__items');
        parent.classList.add('active-types');
        parent.appendChild(clone);
    },
    removeTypesOfDOM(){
        const parent = document.querySelector('.list__items');
        parent.classList.remove('active-types');
        parent.innerHTML ='';
    }, 
    async showType(id){

        const parentElement = document.querySelector('.list-pokemons');
        parentElement.innerHTML = ''; 
        try {
            const type = await typesApi.getOneType(id);
            pokemonsModule.DisplayPokemons(type.pokemons);
        } catch (error) {
            console.log(error);
        }
    }
}

export {typesModule};