import apiClient from './apiConfig';

export const registerStudent = async (student) => {
    try {
        const response = await apiClient.post('/students/register', student);
        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        throw error;
    }
};

export const loginStudent = async (student) => {
    try {
        const response = await apiClient.post('/students/login', student);
        return response.data;
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};