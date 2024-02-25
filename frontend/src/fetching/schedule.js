import instance from "../lib/axios";

export async function createSchedule(payload) {
    try {
        const response = await instance.post("/schedule", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllSchedule(page, limit, courseId, weekId, programId) {
    try {
        const response = await instance.get(`/schedule?page=${page}&limit=${limit}&courseId=${courseId}&weekId=${weekId}&programId=${programId}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getSchedulebyId(id) {
    try {
        const response = await instance.get(`/schedule/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateSchedule(id, payload) {
    try {
        const response = await instance.put(`/schedule/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteSchedule(id) {
    try {
        await instance.delete(`/schedule/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}