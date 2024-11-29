import apiClient from './apiConfig';

export const createNote = async (formData) => {
    try {
        const response = await apiClient.post('/notes/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
};

export const getNotes = async () => {
    try {
        const response = await apiClient.get('/notes');
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}; 