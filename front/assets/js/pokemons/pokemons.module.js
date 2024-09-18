import {pokemonsApi} from "./pokemons.api.js"; 

const pokemonsModule = {

    async init(){
        
        // Afficher tous les pokemons 
        pokemonsModule.fetchAndDisplayPokemons(); 
    }, 

    async fetchAndDisplayPokemons(){
        try {
            const allPokemons = await pokemonsApi.getPokemons(); 
            
            for (const pokemon of allPokemons) {
                pokemonsModule.addPokemonToDOM(pokemon);
            }
        } catch(error) {
            console.log(error); 
        }
    }, 
    addPokemonToDOM(pokemon){
        const pokemonTemplate = document.getElementById("pokemonTemplate"); 

        const clone = pokemonTemplate.content.cloneNode(true); 
        const img = clone.querySelector(".img-fluid");
        img.src = `./assets/img/${pokemon.id}.webp`;
        img.alt = pokemon.name;

        clone.querySelector("[data-pokemon-id]").textcontent = pokemon.id;

        const link = clone.getElementById("pokemonName");
        link.href = `http://localhost:3000/pokemons/${pokemon.id}`;
        link.textContent = pokemon.name;

        clone.querySelector('.pokemon-vote').querySelector('.nb').textContent = pokemon.vote;
        
        // Initialisation listener show details

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const id = pokemon.id;
            pokemonsModule.showPokemonDetailsModale(id);

        });

        // insertion dans le DOM

        const parentElement = document.querySelector('.list-pokemons');
        parentElement.appendChild(clone);


    }, 
    async showPokemonDetailsModale(id){

        try {
            const pokemon = await pokemonsApi.getOnePokemon(id);
            pokemonsModule.addPokemonModaleToDOM(pokemon);
            const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonDetailModal'));
            pokemonModal.show();
        } catch (error) {
            console.log(error);
        }
        
    }, 
    addPokemonModaleToDOM(pokemon){
        const pokemonTemplate = document.getElementById("pokemonDetailsTemplate"); 
        const clone = pokemonTemplate.content.cloneNode(true); 

        clone.querySelector('.modal-title').textContent = pokemon.name;
        
        // // affichage des statistiques -> voir si possible forin

        clone.getElementById('atk').textContent = pokemon.atk;
        clone.getElementById('def').textContent = pokemon.def;
        clone.getElementById('atk_spe').textContent = pokemon.atk_spe;
        clone.getElementById('def_spe').textContent = pokemon.def_spe;
        clone.getElementById('speed').textContent = pokemon.speed;
        clone.getElementById('vote').textContent = pokemon.vote;

        

         // Gestion affichage des types
        const pokemonTypes = pokemon.types;


        for (const type of pokemonTypes) {

            const btn = document.createElement('div');
            btn.textContent = type.name;
            btn.style.padding = "0.7em";
            btn.style.margin = "0.5em";
            btn.style.borderRadius = "1em";
            btn.style.backgroundColor = `#${type.color}`;
            btn.style.border = `#${type.color}`;

            // On ajuste la couleur du texte pour la visibilité
            btn.style.color = this.getContrastColor(type.color);

            //insertion des boutons
            const parent = clone.getElementById('type');
            parent.appendChild(btn);
        }

        const parent = document.querySelector('.container');
        parent.appendChild(clone);

    }, 
    getContrastColor(hexColor) {
        // Convertir la couleur hex en RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
    
        // Calculer la luminosité
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
        // Retourner noir ou blanc selon la luminosité
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }

}; 

export {pokemonsModule}