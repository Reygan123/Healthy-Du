import instance from "../lib/axios";

export async function addExercise(payload) {
    try {
        const response = await instance.post("/exercise", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getExercise(page, limit, query, level, name) {
    try {
        const response = await instance.get(`/exercise?page=${page}&limit=${limit}&q=${query}&level=${level}&name=${name}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getExerciseID(id) {
    try {
        const response = await instance.get(`/exercise/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateExercise(id, payload) {
    try {
        const response = await instance.put(`/exercise/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getExerciseByProgramId(programId) {
    try {
        const response = await instance.get(`/exercise/program/${programId}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteExercise(id) {
    try {
        await instance.delete(`/exercise/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}