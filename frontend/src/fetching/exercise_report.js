import instance from "../lib/axios";

export async function createExerciseReport(payload) {
    try {
        const response = await instance.post("/exercise-report/", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message)
    }
}

export async function getAllExerciseReport(page, limit, userId) {
    try {
        const response = await instance.get(`/exercise-report?page=${page}&limit=${limit}&userId=${userId}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getExerciseReportbyId(id) {
    try {
        const response = await instance.get(`/exercise-report/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateExerciseReport(id, userId, total_exercise, total_time, total_calories) {
    try {
        const response = await instance.put(`/exercise-report/${id}`, (userId, total_exercise, total_time, total_calories))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteExerciseReport(id) {
    try {
        await instance.delete(`/exercise-report/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}