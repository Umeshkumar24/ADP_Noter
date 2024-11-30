const fetchPdf = async (noteId) => {
  try {
    const response = await axios.get(`/api/notes/${noteId}/pdf`, {
      // Add proper headers if needed
      headers: {
        'Accept': 'application/pdf',
      },
      // Handle as blob for PDF
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      console.error('PDF not found:', noteId);
      throw new Error(`PDF with ID ${noteId} not found`);
    }
    console.error('Failed to fetch PDF:', error);
    throw error;
  }
} 