const NoteForm = ({ initialData }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [pdfFile, setPdfFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (pdfFile) {
      formData.append('pdf', pdfFile);
    }

    try {
      if (initialData) {
        await axios.put(`/api/notes/${initialData.id}`, formData);
      } else {
        await axios.post('/api/notes', formData);
      }
      // Handle success (redirect or show message)
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note content"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setPdfFile(e.target.files[0])}
      />
      <button type="submit">Save Note</button>
    </form>
  );
};

export default NoteForm;    

