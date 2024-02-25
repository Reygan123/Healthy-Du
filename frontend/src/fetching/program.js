import instance from "../lib/axios";

export async function addProgram(payload) {
    try {
        const response = await instance.post("/program", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllProgram(page, limit, query, name) {
    try {
        const response = await instance.get(`/program?page=${page}&limit=${limit}&q=${query}&name=${name}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getProgrambyId(id) {
    try {
        const response = await instance.get(`/program/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateProgram(id, payload) {
    try {
        const response = await instance.put(`/program/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteProgram(id) {
    try {
        await instance.delete(`/program/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}