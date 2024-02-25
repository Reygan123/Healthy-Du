import instance from "../lib/axios";

export async function createExerciseCategory(payload) {
    try {
        const response = await instance.post("/exercise-category", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllExerciseCategory(page, limit, exerciseId, categoryId) {
    try {
        const response = await instance.get(`/exercise-category?page=${page}&limit=${limit}&exerciseId=${exerciseId}&categoryId=${categoryId}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getExerciseCategorybyId(id) {
    try {
        const response = await instance.get(`/exercise-category/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateExerciseCategory(id, payload) {
    try {
        const response = await instance.put(`/exercise-category/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteExerciseCategory(id) {
    try {
        await instance.delete(`/exercise-category/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}