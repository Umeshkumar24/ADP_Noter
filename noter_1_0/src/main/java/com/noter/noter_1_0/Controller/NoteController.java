package com.noter.noter_1_0.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.noter.noter_1_0.Note;
import com.noter.noter_1_0.Services.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping
    public List<Note> getAllNotes() {
        return noteService.getAllNotes();
    }

    @GetMapping("/subject/{subject}")
    public List<Note> getNotesBySubject(@PathVariable String subject) {
        return noteService.getNotesBySubject(subject);
    }

    @PostMapping
    public Note createNote(@RequestBody Note note, @RequestParam String role) {
        if (!"EDUCATOR".equals(role)) {
            throw new RuntimeException("Only educators can create notes");
        }
        return noteService.saveNote(note);
    }
}