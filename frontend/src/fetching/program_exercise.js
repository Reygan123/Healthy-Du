import instance from "../lib/axios";

export async function createProgramExercise(payload) {
    try {
        const response = await instance.post("/program-exercise", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllProgramExercise(page, limit, programId, exerciseId) {
    try {
        const response = await instance.get(`/program-exercise?page=${page}&limit=${limit}&programId=${programId}&exerciseId=${exerciseId}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getProgramExercisebyId(id) {
    try {
        const response = await instance.get(`/program-exercise/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateProgramExercise(id, payload) {
    try {
        const response = await instance.put(`/program-exercise/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteProgramExercise(id) {
    try {
        await instance.delete(`/program-exercise/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}