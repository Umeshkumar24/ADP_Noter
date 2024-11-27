import React, { useState } from 'react';
import { createNote } from '../services/noteService';

const AddNote = ({ role }) => {
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [educatorName, setEducatorName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role !== 'EDUCATOR') {
            alert('Only educators can create notes');
            return;
        }
        createNote({ subject, content, educatorName }, role).then(response => {
            console.log('Note created:', response.data);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Subject:</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>Educator Name:</label>
                <input type="text" value={educatorName} onChange={(e) => setEducatorName(e.target.value)} />
            </div>
            <button type="submit">Add Note</button>
        </form>
    );
};

export default AddNote;
