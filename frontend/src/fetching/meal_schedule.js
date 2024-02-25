import instance from "../lib/axios";

export async function addMeal(name) {
    try {
        const response = await instance.post("/meals/add", (name, calories, nutrition))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllMeal(page, limit, nameFilter) {
    try {
        const response = await instance.get(`/meals?page=${page}&limit=${limit}&nameFilter=${nameFilter}`)
        const data = response.data;
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getMeal(id) {
    try {
        const response = await instance.get(`/meals/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateMeal(id, name, calories, nutrition) {
    try {
        const response = await instance.put(`/meals/${id}`, (name, calories, nutrition))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteMeal(id) {
    try {
        await instance.delete(`/meals/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}