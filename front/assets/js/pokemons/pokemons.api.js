const pokemonsApi = {
    baseUrl: "http://localhost:3000/pokemons/", 

    async getPokemons(){
        const httpResponse = await fetch(pokemonsApi.baseUrl); 
        const data = await httpResponse.json(); 
        if(httpResponse.ok){
            return data;
        } else {
            throw data; 
        }
    }, 
    async getOnePokemon(id){
        const httpResponse = await fetch(pokemonsApi.baseUrl + '/' + id);
        const data = await httpResponse.json();

        if(httpResponse.ok){
            return data;
        } else {
            throw data;
        }
    }, 
}

export {pokemonsApi};