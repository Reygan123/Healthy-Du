import instance from "../lib/axios";

export async function addWeek(name, description) {
    try {
        const response = await instance.post("/week/add", (name, description))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllWeek(page, limit, name) {
    try {
        const response = await instance.get(`/week?page=${page}&limit=${limit}&name=${name}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getWeekbyId(id) {
    try {
        const response = await instance.get(`/week/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateWeek(id, name, description) {
    try {
        const response = await instance.put(`/week/${id}`, (name, description))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteWeek(id) {
    try {
        await instance.delete(`/week/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}