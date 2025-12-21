import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.coaching.appbyte.net/web",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getApi = async (endpoint, query) => {
    try {
        const response = await apiClient.get(endpoint, { params: query });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.error || error?.message || 'Something went wrong';
        throw new Error(errorMessage);
    }
};

export const postApi = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Something went wrong';
        throw new Error(errorMessage);
    }
};

export const putApi = async (endpoint, data) => {
    try {
        const response = await apiClient.put(endpoint, data);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Something went wrong';
        throw new Error(errorMessage);
    }
};

export const deleteApi = async (endpoint) => {
    try {
        const response = await apiClient.delete(endpoint);
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Something went wrong';
        throw new Error(errorMessage);
    }
};

export const fileApi = async (endpoint, data) => {
    try {
        const response = await apiClient.post(endpoint, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        const errorMessage = error?.response?.data?.error || error?.response?.data?.message || error?.message || 'Something went wrong';
        throw new Error(errorMessage);
    }
};