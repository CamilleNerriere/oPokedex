const typesApi = {
    baseUrl: `${import.meta.env.VITE_API_URL}/types/`,
    async getTypes() {
        const httpResponse = await fetch(typesApi.baseUrl);
        const data = await httpResponse.json();

        if (httpResponse.ok) {
            return data;
        } else {
            throw data;
        }
    },
    async getOneType(id) {
        const httpResponse = await fetch(`${typesApi.baseUrl}/${id}`);
        const data = await httpResponse.json();

        if (httpResponse.ok) {
            return data;
        } else {
            throw data;
        }
    },
};

export { typesApi };
