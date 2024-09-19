// fonctions test CSS


document.querySelector('#bulbizarreName').addEventListener('click', function() {
    // Affiche la modale Pokémon
    const pokemonModal = new bootstrap.Modal(document.getElementById('pokemonDetailModal'));
    pokemonModal.show();
});

// Affichage de la modale pour les détails de l'équipe
document.querySelector('.itemDetailsLink').addEventListener('click', function() {
    // Affiche la modale d'équipe
    const teamModal = new bootstrap.Modal(document.getElementById('teamDetailModal'));
    teamModal.show();
});

// Affichage ajouter une équipe : 

document.querySelector('.addTeamBtn').addEventListener('click', function() {
    // Affiche la modale ajout équipe
    const addTeamModal = new bootstrap.Modal(document.getElementById('addTeamModal'));
    addTeamModal.show();
});
