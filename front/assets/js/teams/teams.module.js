import {teamsApi} from "./teams.api.js"; 
import {colorGestion} from "../utils/colorGestion.js";
import {pokemonsModule} from "../pokemons/pokemons.module.js";

const teamsModule = {
    init(){
        // event listener pour afficher les teams 
        const teamLink = document.getElementById('teamsLink'); 
        teamLink.addEventListener('click',(event) => {teamsModule.showOrHideTeams(event)});

        //event listener submit formulaire ajout équipe -> delegation car modale n'existe pas au chargement du DOM

        // const container = document.querySelector('.container');

        // container.addEventListener('submit', async (event) => {
        //     if (event.target.matches('#addTeamForm')) {
        //         event.preventDefault(); 

        //         try {
        //             await teamsModule.handleSubmitOnAddTeamForm(event);
        //             const modal = bootstrap.Modal.getInstance(document.querySelector('#addTeamModal'));
        //             modal.hide();
        //         } catch(error) {
        //             console.error("Erreur soumission formulaire");
        //         }         
        //     }
        // })

    }, 
    async showOrHideTeams(event){
        event.preventDefault();
        const parent = document.querySelector('.team__items');

        if (parent.classList.contains('active-teams')){
            teamsModule.removeTypesOfDOM();
        } else {
            try {
                const teams = await teamsApi.getTeams();
        
                for (const team of teams) {
                    teamsModule.addTeamsToDOM(team); 
                    
                }
                teamsModule.addAddBtnToDOM();

    
            } catch (error) {
            console.log(error)
            } 
        }       
    }, 
    addTeamsToDOM(team){
        const itemTemplate = document.getElementById('itemsListTemplate');
        const clone = itemTemplate.content.cloneNode(true);

        const teamBtn = clone.querySelector('.typeBtn');
        teamBtn.style.backgroundColor = `#d51515`;
        teamBtn.style.border = `#d51515`;
        teamBtn.style.color = colorGestion.hexColor('d51515');

        teamBtn.textContent = team.name;
        teamBtn.closest('a').href = `${teamsApi.baseUrl}${team.id}`

        // Listener pour afficher les teams
        teamBtn.addEventListener('click', (event) => {
            event.preventDefault();
            teamsModule.showTeamDetailsModal(team.id)}
        );
   
        const parent = document.querySelector('.team__items');
        parent.classList.add('active-teams');
        parent.appendChild(clone);
    },
    addAddBtnToDOM(){
        const itemTemplate = document.getElementById('itemsListTemplate');
        const clone = itemTemplate.content.cloneNode(true);

        const addBtn = clone.querySelector('.typeBtn');
        addBtn.style.backgroundColor = `#691010`;
        addBtn.style.border = `#691010`;
        addBtn.textContent = `Ajout équipe`; 
        addBtn.style.color = colorGestion.hexColor('691010');
        
        addBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const modal = document.getElementById('addTeamModal');
            const teamModal = new bootstrap.Modal(modal);
            teamModal.show();
            
            const form = document.querySelector('#addTeamForm');
            form.addEventListener('submit', (event) => {teamsModule.firstHandSubmit(event)} )
        })
   
        const parent = document.querySelector('.team__items');
        parent.classList.add('active-teams');
        parent.appendChild(clone);
    },
    removeTypesOfDOM(){
        const parent = document.querySelector('.team__items');
        parent.classList.remove('active-teams');; 
        parent.innerHTML ='';
    }, 
    async showTeamDetailsModal(id){
        try {
            const team = await teamsApi.getOneTeam(id);
            teamsModule.clearTeamDetailsModale();
            
            teamsModule.addTeamModaleToDOM(team);
            teamsModule.showDetailsModal();
        } catch (error) {
            console.log(error);
        }
    },
    clearTeamDetailsModale() {
        const modalBody = document.getElementById('teamDetailModal');

        if(modalBody){
            modalBody.remove();
        } 
    },
    addTeamModaleToDOM(team){
        const teamTemplate = document.getElementById("teamDetailTemplate"); 
        const clone = teamTemplate.content.cloneNode(true); 

        clone.querySelector('.teamDetailName').textContent = team.name;

        if(team.description){
            clone.getElementById('teamDescription').textContent = team.description;
        }
        
        //insertion des pokemons de l'équipe
        const teamPokemons = team.pokemons; 
        const listRow = clone.querySelector('.list__pokemons'); 

        for (const pokemon of teamPokemons) {
           const card = teamsModule.createPokemonCard(pokemon);
           listRow.appendChild(card);
        }

        const parent = document.querySelector('.container');
        parent.appendChild(clone);

        //listener sur edit btn pour afficher le formulaire

        const form = document.querySelector('.edit__form');
        form.classList.add('hidden');

        const editBtns = document.querySelectorAll('.teamEdit');
        
        for (const editBtn of editBtns) {
            editBtn.addEventListener('click', () => {
                form.classList.toggle('hidden');
            })
        }
    }, 
    createPokemonCard(pokemon){
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

        // récupération du clone 

        return(clone);
        // const parentElement = clone.querySelector('.list-pokemons');
        // parentElement.appendChild(clone);
    },
    showDetailsModal(){
        const modal = document.getElementById('teamDetailModal');
        const pokemonModal = new bootstrap.Modal(modal);
        pokemonModal.show();
    },
    async handleSubmitOnAddTeamForm(event){
        const form = event.target;
        const formData = new FormData(form); 
        const data = JSON.stringify(Object.fromEntries(formData));
        try {
            const newTeam = await teamsApi.createTeam(data);
            console.log(newTeam);
        } catch (error) {
            console.log(error); 
        }
    }, 
    async firstHandSubmit(event) {
        event.preventDefault(); 

        try {
            await teamsModule.handleSubmitOnAddTeamForm(event);
            const modal = bootstrap.Modal.getInstance(document.querySelector('#addTeamModal'));
            modal.hide();
        } catch(error) {
            console.error(error);
        }      
    }

}

export {teamsModule}