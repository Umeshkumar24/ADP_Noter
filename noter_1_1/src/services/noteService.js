import apiClient from './apiConfig';

export const getAllNotes = () => {
    return apiClient.get('/notes');
};

export const getNotesBySubject = (subject) => {
    return apiClient.get(`/notes/subject/${subject}`);
};

export const createNote = (note, role) => {
    return apiClient.post('/notes', note, { params: { role } });
};
