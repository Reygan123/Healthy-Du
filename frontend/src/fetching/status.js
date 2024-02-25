import instance from "../lib/axios";

export async function createStatusProgram(create) {
    try {
        const response = await instance.post("/status/", (create))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllStatusProgram(page, limit, userId, programId) {
    try {
        const response = await instance.get(`/status?page=${page}&limit=${limit}&userId=${userId}&programId=${programId}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getStatusProgrambyId(id) {
    try {
        const response = await instance.get(`/status/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateStatusProgram(id, update) {
    try {
        const response = await instance.put(`/status/${id}`, (update))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteStatusProgram(id) {
    try {
        await instance.delete(`/status/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}