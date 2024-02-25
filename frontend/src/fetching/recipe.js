import instance from "../lib/axios";

export async function addRecipe(payload) {
    try {
        const response = await instance.post("/recipes/add", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllRecipe(page, limit, query, nameFilter) {
    try {
        const response = await instance.get(`/recipes?page=${page}&limit=${limit}&q=${query}&nameFilter=${nameFilter}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getRecipebyId(id) {
    try {
        const response = await instance.get(`/recipes/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateRecipe(id, name, description, time_prepare, time_cooking, tutorial) {
    try {
        const response = await instance.put(`/recipes/${id}`, (name, description, time_prepare, time_cooking, tutorial))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteRecipe(id) {
    try {
        await instance.delete(`/recipes/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function uploadImage(id, file) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await instance.put(`/recipes/upload/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}