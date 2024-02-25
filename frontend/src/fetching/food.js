import instance from "../lib/axios";

export async function addFood(payload) {
    try {
        const response = await instance.post("/foods/add", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllFood(page, limit, query, nameFilter) {
    try {
        const response = await instance.get(`/foods?page=${page}&limit=${limit}&q=${query}&nameFilter=${nameFilter}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getFoodById(id) {
    try {
        const response = await instance.get(`/foods/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateFood(id, payload) {
    try {
        const response = await instance.put(`/foods/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteFood(id) {
    try {
        await instance.delete(`/foods/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}