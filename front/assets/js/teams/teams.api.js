const teamsApi = {
    baseUrl: "http://localhost:3000/teams/", 

    async getTeams(){
        const httpResponse = await fetch(teamsApi.baseUrl); 
        const data = await httpResponse.json(); 
        if(httpResponse.ok){
            return data;
        } else {
            throw data; 
        }
    }, 
    async getOneTeam(id){
        const httpResponse = await fetch(teamsApi.baseUrl + '/' + id);
        const data = await httpResponse.json();

        if(httpResponse.ok){
            return data;
        } else {
            throw data;
        }
    },
    async createTeam(data){
        const httpResponse = await fetch(teamsApi.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: data,
        });
        const newTeam = await httpResponse.json();
        if (httpResponse.ok) {
            return newTeam;
        } else {
            throw newTeam;
        }
    }, 
    async updateTeam(data){
        const dataToJSON = JSON.stringify(data);
        const httpResponse = await fetch(`${teamsApi.baseUrl}/${data.team_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: dataToJSON,
        });
        const newTeam = await httpResponse.json();
        if (httpResponse.ok) {
            return newTeam;
        } else {
            throw newTeam;
        }
    }, 
    async addPokemonToTeam(data){
        const httpResponse = await fetch(`${teamsApi.baseUrl}/${data.pokemon_id}/${data.team_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const addedPokemon = await httpResponse.json();
        if (httpResponse.ok) {
            return addedPokemon;
        } else {
            throw addedPokemon;
        }
    }, 
    async removePokemonFromTeamAPI(pokemonId, teamId){
        const httpResponse = await fetch(`${teamsApi.baseUrl}/${pokemonId}/${teamId}`, {
            method: "DELETE",
        });
        if (httpResponse.ok) {
            return true;
        } else {
            const response = await httpResponse.json();
            throw response; 
        }
    },
    async removeOneTeam(teamId){
        const httpResponse = await fetch(`${teamsApi.baseUrl}/${teamId}`, {
            method: "DELETE",
        });
        if (httpResponse.ok) {
            return true;
        } else {
            const response = await httpResponse.json();
            throw response; 
        }
    }
}

export {teamsApi};