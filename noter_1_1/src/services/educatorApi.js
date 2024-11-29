import apiClient from './apiConfig';

export const registerEducator = async (educator) => {
    try {
        const response = await apiClient.post('/educators/register', educator);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

export const loginEducator = async (educator) => {
    try {
        const response = await apiClient.post('/educators/login', educator);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};
