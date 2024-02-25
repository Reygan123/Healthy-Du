import instance from "../lib/axios";

export async function createJoinCourse(payload) {
    try {
        const response = await instance.post("/join", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllJoinCourse(page, limit, userId, courseId) {
    try {
        const response = await instance.get(`/join?page=${page}&limit=${limit}&userId=${userId}&courseId=${courseId}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getJoinCoursebyId(id) {
    try {
        const response = await instance.get(`/join/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateJoinCourse(id, userId, courseId) {
    try {
        const response = await instance.put(`/join/${id}`, (userId, courseId))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteJoinCourse(id) {
    try {
        await instance.delete(`/join/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}