import {pokemonsApi} from "./pokemons.api.js"; 
import {colorGestion} from "../utils/colorGestion.js";
import {teamsApi} from "../teams/teams.api.js";

const pokemonsModule = {

    async init(){
        
        // Afficher tous les pokemons 
        try {
            const allPokemons = await pokemonsApi.getPokemons(); 
            pokemonsModule.DisplayPokemons(allPokemons); 
        } catch (error) {
            console.log(error);
        }
        
    }, 

    async DisplayPokemons(pokemons){
        try {
            for (const pokemon of pokemons) {
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

        //gestion des dataset (id et type)
        const pokemonElement = clone.querySelector('.team__item');

        pokemonElement.dataset.pokemonId = pokemon.id;
        
        const typesData = [];
        const pokemonTypes = pokemon.types;

        if(pokemonTypes){
            for (const type of pokemonTypes){
            typesData.push(type.name);
            }
            pokemonElement.dataset.pokemonType = JSON.stringify(typesData); 
        }

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
            pokemonsModule.clearPokemonDetailsModale();
            
            await pokemonsModule.addPokemonModaleToDOM(pokemon);
            pokemonsModule.showDetailsModal();
        } catch (error) {
            console.log(error);
        }
        
    }, 
    async addPokemonModaleToDOM(pokemon){
        const pokemonTemplate = document.getElementById("pokemonDetailsTemplate"); 
        const clone = pokemonTemplate.content.cloneNode(true); 

        clone.querySelector('.modal-title').textContent = pokemon.name;

        clone.querySelector('.img-fluid').src = `./assets/img/${pokemon.id}.webp`;
        
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
            btn.style.color = colorGestion.hexColor(type.color);

            //insertion des boutons
            const parent = clone.getElementById('type');
            parent.appendChild(btn);
        }

        // création du formulaire pour ajouter aux équipes 

        try {
            const teams = await teamsApi.getTeams();
            const form = clone.querySelector('.form-inline');
            form.addEventListener('submit', (event)=> {
                pokemonsModule.addPokemonToTeam(event);
            })
            const pokemonId = form.querySelector('input[name="pokemon_id"]')
            pokemonId.value = pokemon.id;
            const select = form.querySelector('select[name="team_id"]'); 
    
            for (const team of teams) {
                const option = document.createElement('option'); 
                option.value = team.id;
                option.textContent = team.name;
                select.appendChild(option);
            }
        } catch (error) {
            console.log(error)
        }

        const parent = document.querySelector('.container');
        parent.appendChild(clone);



    }, 
    clearPokemonDetailsModale() {
        const modalBody = document.getElementById('pokemonDetailModal');

        if(modalBody){
            modalBody.remove();
        }
        
    },
    showDetailsModal(){
        const modal = document.getElementById('pokemonDetailModal');
        const pokemonModal = new bootstrap.Modal(modal);
        pokemonModal.show();
    },
    async addPokemonToTeam(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form); 
        const data = Object.fromEntries(formData);
        console.log(data);
        try {
            if(data.pokemon_id && data.team_id){
                console.log('on est passé par ici')
                const addedPokemon = await teamsApi.addPokemonToTeam(data);
                console.log(addedPokemon);
                const modal = bootstrap.Modal.getInstance(document.querySelector('#pokemonDetailModal'));
                modal.hide();
            }
        } catch (error) {
            console.log(error);
        }
    }
}; 

export {pokemonsModule}