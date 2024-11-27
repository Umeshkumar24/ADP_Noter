package com.noter.noter_1_0;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/notes")
public class NoteController {
    @GetMapping("path")
    public ResponseEntity<String> allNotes() {
        return new ResponseEntity<String>("All Notes", HttpStatus.OK);
    }
    
}
