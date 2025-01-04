import { teamsApi } from './teams.api.js';
import { colorGestion } from '../utils/colorGestion.js';
import { alert } from '../utils/alert.js';
import { pokemonsModule } from '../pokemons/pokemons.module.js';

import sanitizeHtml from 'sanitize-html';

const teamsModule = {
    init() {
        // event listener pour afficher les teams
        const teamLink = document.getElementById('teamsLink');
        teamLink.addEventListener('click', event => {
            teamsModule.showOrHideTeams(event);
        });
    },
    async showOrHideTeams(event) {
        event.preventDefault();
        const parent = document.querySelector('.team__items');

        if (parent.classList.contains('active-teams')) {
            teamsModule.removeTypesOfDOM();
        } else {
            try {
                const teams = await teamsApi.getTeams();

                for (const team of teams) {
                    teamsModule.addTeamsToDOM(team);
                }
                teamsModule.addAddBtnToDOM();
            } catch (error) {
                console.log(error);
            }
        }
    },
    addTeamsToDOM(team) {
        const itemTemplate = document.getElementById('itemsListTemplate');
        const clone = itemTemplate.content.cloneNode(true);

        const teamBtn = clone.querySelector('.typeBtn');
        teamBtn.style.backgroundColor = `#d51515`;
        teamBtn.style.border = `#d51515`;
        teamBtn.style.color = colorGestion.hexColor('d51515');

        teamBtn.textContent = team.name;
        teamBtn.closest('a').href = `${teamsApi.baseUrl}${team.id}`;

        // Listener pour afficher les teams
        teamBtn.addEventListener('click', event => {
            event.preventDefault();
            teamsModule.showTeamDetailsModal(team.id);
        });

        const parent = document.querySelector('.team__items');
        parent.classList.add('active-teams');
        parent.appendChild(clone);
    },
    addAddBtnToDOM() {
        const itemTemplate = document.getElementById('itemsListTemplate');
        const clone = itemTemplate.content.cloneNode(true);

        const addBtn = clone.querySelector('.typeBtn');
        addBtn.style.backgroundColor = `#691010`;
        addBtn.style.border = `#691010`;
        addBtn.textContent = `Ajout équipe`;
        addBtn.style.color = colorGestion.hexColor('691010');

        addBtn.addEventListener('click', event => {
            event.preventDefault();
            const modal = document.getElementById('addTeamModal');
            const teamModal = new bootstrap.Modal(modal);
            teamModal.show();

            const form = document.querySelector('#addTeamForm');
            form.addEventListener('submit', event => {
                teamsModule.handleSubmitOnAddTeamForm(event);
            });
        });

        const parent = document.querySelector('.team__items');
        parent.classList.add('active-teams');
        parent.appendChild(clone);
    },
    removeTypesOfDOM() {
        const parent = document.querySelector('.team__items');
        parent.classList.remove('active-teams');
        parent.innerHTML = '';
    },
    async showTeamDetailsModal(id) {
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

        if (modalBody) {
            modalBody.remove();
        }
    },
    addTeamModaleToDOM(team) {
        const teamTemplate = document.getElementById('teamDetailTemplate');
        const clone = teamTemplate.content.cloneNode(true);

        clone.querySelector('[data-team-id]').dataset.teamId = team.id;

        clone.querySelector('.teamDetailName').textContent = team.name;

        if (team.description) {
            clone.getElementById('teamDescription').textContent =
                team.description;
        }

        //insertion des pokemons de l'équipe
        const teamPokemons = team.pokemons;
        const listRow = clone.querySelector('.list__pokemons');

        const teamId = team.id;
        for (const pokemon of teamPokemons) {
            const card = teamsModule.createPokemonCard(pokemon, teamId);
            listRow.appendChild(card);
        }

        const parent = document.querySelector('.container');
        parent.appendChild(clone);

        //listener sur edit btn pour afficher le formulaire

        const form = document.querySelector('.edit__form');
        console.log(team.id);
        form.querySelector('input[name="team_id"]').value = team.id;

        // listener submitform
        form.classList.add('hidden');

        form.addEventListener('submit', event => {
            teamsModule.handleSubmitOnEditTeamForm(event);
        });

        const editBtns = document.querySelectorAll('.teamEdit');

        for (const editBtn of editBtns) {
            editBtn.addEventListener('click', () => {
                form.classList.toggle('hidden');
            });
        }

        // listener delete team

        const deleteBtn = document.querySelector('.teamDelete');

        deleteBtn.addEventListener('click', event => {
            teamsModule.removeTeam(event);
        });
    },
    createPokemonCard(pokemon, teamID) {
        const pokemonTemplate = document.getElementById('pokemonTemplate');

        const clone = pokemonTemplate.content.cloneNode(true);
        const img = clone.querySelector('.img-fluid');
        img.src = `./assets/img/${pokemon.id}.webp`;
        img.alt = pokemon.name;

        // icon delete

        const deleteIcon = clone.querySelector('.pokemon-vote');
        deleteIcon.classList.remove('pokemon-vote');

        deleteIcon.querySelector('.heart-icon').remove();
        deleteIcon.querySelector('.nb').remove();
        deleteIcon.classList.add('pokemon-delete');

        deleteIcon.addEventListener('click', () => {
            teamsModule.removePokemonFromTeam(event);
        });

        //gestion des dataset (id et type)
        const pokemonElement = clone.querySelector('.team__item');

        pokemonElement.dataset.pokemonId = pokemon.id;
        pokemonElement.dataset.pokemonTeam = teamID;

        const typesData = [];
        const pokemonTypes = pokemon.types;

        if (pokemonTypes) {
            for (const type of pokemonTypes) {
                typesData.push(type.name);
            }
            pokemonElement.dataset.pokemonType = JSON.stringify(typesData);
        }

        const link = clone.getElementById('pokemonName');
        link.href = `http://localhost:3000/pokemons/${pokemon.id}`;
        link.textContent = pokemon.name;

        // Initialisation listener show details

        link.addEventListener('click', event => {
            event.preventDefault();
            const id = pokemon.id;
            pokemonsModule.showPokemonDetailsModale(id);
        });

        // récupération du clone

        return clone;
    },

    showDetailsModal() {
        const modal = document.getElementById('teamDetailModal');
        const pokemonModal = new bootstrap.Modal(modal);
        pokemonModal.show();
    },
    async handleSubmitOnAddTeamForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData);

        const sanitizedData = {
            ...rawData,
            name: sanitizeHtml(rawData.name),
            description: sanitizeHtml(rawData.description),
        };

        const data = JSON.stringify(sanitizedData);

        try {
            const newTeam = await teamsApi.createTeam(data);

            const message = 'Equipe ajoutée avec succès';
            const type = 'success';
            alert(message, type);

            setTimeout(() => {
                hideAddModal();
            }, '1500');

            const hideAddModal = () => {
                const modal = bootstrap.Modal.getInstance(
                    document.querySelector('#addTeamModal')
                );
                modal.hide();
                teamsModule.showOrHideTeams(event);
                teamsModule.showOrHideTeams(event);
            };
        } catch (error) {
            console.log(error);
        }
    },
    async handleSubmitOnEditTeamForm(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData);

        const data = {
            ...rawData,
            name: sanitizeHtml(rawData.name),
            description: sanitizeHtml(rawData.description),
        };

        try {
            if (data.name || data.description) {
                const updatedteam = await teamsApi.updateTeam(data);
                const parent = event.target.closest('#teamDetailModal');
                console.log(parent);
                parent.querySelector('#teamDescription').textContent =
                    data.description;
                parent.querySelector('.teamDetailName').textContent = data.name;
                teamsModule.showOrHideTeams(event);
                const message = 'Equipe modifiée avec succès';
                const type = 'success';
                alert(message, type);
            }
        } catch (error) {
            const message = 'Champ manquant ou invalide';
            const type = 'warning';
            alert(message, type);

            console.log(error);
        }
    },
    removePokemonFromTeam(event) {
        event.preventDefault();
        const pokemonCard = event.target.closest('.team__item');
        const pokemonId = pokemonCard.dataset.pokemonId;
        const teamId = pokemonCard.dataset.pokemonTeam;

        try {
            teamsApi.removePokemonFromTeamAPI(pokemonId, teamId);
            const modal = bootstrap.Modal.getInstance(
                document.querySelector('#teamDetailModal')
            );
            modal.hide();
        } catch (error) {
            console.log(error);
        }
    },
    removeTeam(event) {
        event.preventDefault();
        const teamCard = event.target.closest('#teamDetailModal');
        const teamId = teamCard.dataset.teamId;
        try {
            teamsApi.removeOneTeam(teamId);
            const modal = bootstrap.Modal.getInstance(
                document.querySelector('#teamDetailModal')
            );
            modal.hide();
            teamsModule.showOrHideTeams(event);
        } catch (error) {
            console.log(error);
        }
    },
};

export { teamsModule };
