package com.noter.noter_1_0.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noter.noter_1_0.Note;
import com.noter.noter_1_0.Models.NoteRepository;

@Service
public class NoteService {
    @Autowired
    private NoteRepository noteRepository;

    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public List<Note> getNotesBySubject(String subject) {
        return noteRepository.findBySubject(subject);
    }

    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }
}