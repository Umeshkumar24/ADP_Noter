import apiClient from './apiConfig';

export const registerEducator = (educator) => {
    return apiClient.post('/educators/register', educator);
};

export const loginEducator = (educator) => {
    return apiClient.post('/educators/login', educator);
};
