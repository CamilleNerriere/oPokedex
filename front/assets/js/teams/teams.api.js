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
}

export {teamsApi};