package com.noter.noter_1_0.Models;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.noter.noter_1_0.Note;

public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findBySubject(String subject);
}