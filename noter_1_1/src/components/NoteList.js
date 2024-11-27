import React, { useEffect, useState } from 'react';
import { getAllNotes } from '../services/noteService';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getAllNotes().then(response => {
            setNotes(response.data);
        });
    }, []);

    return (
        <div>
            <h1>All Notes</h1>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        <h2>{note.subject}</h2>
                        <p>{note.content}</p>
                        <p><strong>Educator:</strong> {note.educatorName}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NoteList;
