import instance from "../lib/axios";

export async function registerUser(name, email, username, password, role) {
    try {
        const response = await instance.post('/users/register', { name, email, username, password, role });
        const data = response.data;
        localStorage.setItem("token", data.accessToken)

        return data
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getUserbyId(id) {
    try {
        const response = await instance.get(`/users/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function login(params) {
    try {
        console.log(params, "<<<< ");
        const { emailOrUsername, password } = params
        const response = await instance({
            url: '/users/login',
            method: 'POST',
            data: {
                emailOrUsername, password
            }
        })

        const data = response.data;
        localStorage.setItem("token", data.accessToken)

        console.log("Token:", data.accessToken);

        return data
    } catch (error) {
        console.log(error);
    }
}

export async function getAllUser(page, limit, query, name) {
    try {
        const response = await instance.get(`/users/all?page=${page}&limit=${limit}&q=${query}&name=${name}`)
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found')
    }
}

export async function getUserLogin() {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            throw new Error("Token not found");
        }

        const response = await instance.get("/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = response.data;
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateUser(payload) {
    try {
        const response = await instance({
            url: '/users',
            method: 'PUT',
            data: payload
        })

        const data = response.data;
        return data
    } catch (error) {
        console.log(error);
        throw error
    }
}