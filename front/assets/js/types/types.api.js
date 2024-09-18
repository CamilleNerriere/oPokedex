const typesApi = {
    baseUrl: "http://localhost:3000/types/",
    async getTypes(){
        const httpResponse = await fetch(typesApi.baseUrl); 
        const data = await httpResponse.json();

        if(httpResponse.ok){
            return data;
        } else {
            throw data;
        }
    },
    async getOneType(id){
        const httpResponse = await fetch(`${typesApi.baseUrl}/${id}`); 
        const data = await httpResponse.json();

        if(httpResponse.ok){
            return data;
        } else {
            throw data;
        }
    }

}

export{typesApi};