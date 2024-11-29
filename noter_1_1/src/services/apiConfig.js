import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true
});

// Add response interceptor to handle errors
instance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchNotePdf = async (noteId) => {
  try {
    const response = await instance.get(`/notes/${noteId}/pdf`, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/pdf'  // Explicitly state we want PDF
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default instance;


