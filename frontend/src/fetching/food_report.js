import instance from "../lib/axios";

export async function createFoodReport(userId, foodId, mealId, date, amount) {
    try {
        const response = await instance.post("/report/", {
            userId,
            foodId,
            mealId,
            date,
            amount
        });

        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error adding food to report');
    }
}

export async function getAllFoodReports(page, limit, queryFilter, userId, mealId, dateReport) {
    try {
        const response = await instance.get(`/report?page=${page}&limit=${limit}&q=${queryFilter}&userId=${userId}&mealId=${mealId}&dateReport=${dateReport}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching food reports');
    }
}

export async function getFoodReportById(id) {
    try {
        const response = await instance.get(`/report/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error fetching food report');
    }
}

export async function updateFoodReport(id, userId, foodId, mealId) {
    try {
        const response = await instance.put(`/report/${id}`, {
            userId,
            foodId,
            mealId
        });

        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error updating food report');
    }
}

export async function deleteFoodReport(id) {
    try {
        await instance.delete(`/report/${id}`);
    } catch (error) {
        throw new Error(error.response.data.message || 'Error deleting food report');
    }
}
