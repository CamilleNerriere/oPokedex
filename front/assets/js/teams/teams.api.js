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
    }
}

export {teamsApi};