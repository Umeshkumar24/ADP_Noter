package com.noter.noter_1_0.Controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.noter.noter_1_0.Entity.Note;
import com.noter.noter_1_0.Services.NoteService;

@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "http://localhost:3000")
public class NoteController {

    private static final Logger logger = LoggerFactory.getLogger(NoteController.class);

    @Autowired
    private NoteService noteService;

    @PostMapping("/create")
    public ResponseEntity<?> createNote(
            @RequestParam("subject") String subject,
            @RequestParam("educatorName") String educatorName,
            @RequestParam("file") MultipartFile file) {
        logger.info("Creating note - Subject: {}, Educator: {}, Filename: {}",
                subject, educatorName, file.getOriginalFilename());
        try {
            Note note = new Note();
            note.setSubject(subject);
            note.setEducatorName(educatorName);
            note.setFileName(file.getOriginalFilename());
            note.setFileType(file.getContentType());
            note.setFileContent(file.getBytes());

            Note savedNote = noteService.saveNote(note);
            logger.info("Note created successfully with ID: {}", savedNote.getId());
            return ResponseEntity.ok(savedNote);
        } catch (Exception e) {
            logger.error("Error creating note", e);
            return ResponseEntity.badRequest().body("Error creating note: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllNotes() {
        try {
            return ResponseEntity.ok(noteService.getAllNotes());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching notes: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/debug")
    public ResponseEntity<?> debugNote(@PathVariable Long id) {
        try {
            Note note = noteService.getNoteById(id);
            if (note == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Note not found"));
            }

            Map<String, Object> debugInfo = new HashMap<>();
            debugInfo.put("id", note.getId());
            debugInfo.put("subject", note.getSubject());
            debugInfo.put("educatorName", note.getEducatorName());
            debugInfo.put("fileName", note.getFileName());
            debugInfo.put("fileType", note.getFileType());
            debugInfo.put("hasContent", note.getFileContent() != null);
            debugInfo.put("contentLength", note.getFileContent() != null ? note.getFileContent().length : 0);

            return ResponseEntity.ok(debugInfo);
        } catch (Exception e) {
            logger.error("Error debugging note: ", e);
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Error debugging note: " + e.getMessage()));
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPdf(@RequestParam("file") MultipartFile file,
            @RequestParam("subject") String subject) {
        try {
            Note note = new Note();
            note.setPdfFile(file.getBytes());
            note.setFileName(file.getOriginalFilename());
            note.setSubject(subject);
            noteService.saveNote(note);
            return ResponseEntity.ok().body("File uploaded successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<?> downloadPdf(@PathVariable Long id) {
        try {
            logger.info("Attempting to download PDF for note ID: {}", id);

            Note note = noteService.getNoteById(id);
            if (note == null) {
                logger.warn("Note not found with ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "Note not found"));
            }

            byte[] pdfContent = note.getFileContent();
            if (pdfContent == null || pdfContent.length == 0) {
                logger.warn("No PDF content found for note ID: {}", id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(false, "No PDF content found"));
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("attachment")
                    .filename("note-" + id + ".pdf")
                    .build());

            logger.info("Successfully retrieved PDF for note ID: {}", id);
            return new ResponseEntity<>(pdfContent, headers, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error downloading PDF for note ID: " + id, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error downloading PDF"));
        }
    }
}