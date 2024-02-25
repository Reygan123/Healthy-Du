import instance from "../lib/axios";

export async function addCourse(payload) {
    try {
        const response = await instance.post("/course/add", (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getAllCourse(page, limit, query, name) {
    try {
        const response = await instance.get(`/course?page=${page}&limit=${limit}&q=${query}&name=${name}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getCoursebyId(id) {
    try {
        const response = await instance.get(`/course/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateCourse(id, payload) {
    try {
        const response = await instance.put(`/course/${id}`, (payload))
        const data = response.data
        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteCourse(id) {
    try {
        await instance.delete(`/course/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}