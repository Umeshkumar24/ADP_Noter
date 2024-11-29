import apiClient from './apiConfig';

export const registerStudent = (student) => {
    return apiClient.post('/students/register', student);
};

export const loginStudent = (student) => {
    return apiClient.post('/students/login', student);
};
