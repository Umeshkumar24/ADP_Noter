import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notes';

export const getAllNotes = () => {
    return axios.get(API_URL);
};

export const getNotesBySubject = (subject) => {
    return axios.get(`${API_URL}/subject/${subject}`);
};

export const createNote = (note, role) => {
    return axios.post(API_URL, note, { params: { role } });
};
