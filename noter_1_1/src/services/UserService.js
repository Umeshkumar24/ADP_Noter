import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const registerStudent = (student) => {
    return axios.post(`${API_URL}/students/register`, student);
};

export const registerEducator = (educator) => {
    return axios.post(`${API_URL}/educators/register`, educator);
};

export const loginStudent = (student) => {
    return axios.post(`${API_URL}/students/login`, student);
};

export const loginEducator = (educator) => {
    return axios.post(`${API_URL}/educators/login`, educator);
};
