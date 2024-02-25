import instance from "../lib/axios";

export async function addCategory(payload) {
    try {
        const response = await instance.post("/category/add", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllCategory(page, limit, query, name) {
    try {
        const response = await instance.get(`/category?page=${page}&limit=${limit}&q=${query}&name=${name}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getCategorybyId(id) {
    try {
        const response = await instance.get(`/category/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateCategory(id, name) {
    try {
        const response = await instance.put(`/category/${id}`, (name))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteCategory(id) {
    try {
        await instance.delete(`/category/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}