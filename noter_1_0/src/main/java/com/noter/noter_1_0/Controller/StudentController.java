package com.noter.noter_1_0.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noter.noter_1_0.Entity.Student;
import com.noter.noter_1_0.Services.StudentService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/students")

public class StudentController {
    private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<?> registerStudent(@RequestBody Student student) {
        try {
            logger.debug("Registration request received for username: {}", student.getUsername());
            
            if (student.getUsername() == null || student.getUsername().trim().isEmpty() ||
                student.getPassword() == null || student.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Username and password are required"));
            }

            Student savedStudent = studentService.saveStudent(student);
            return ResponseEntity.ok(new ApiResponse(true, "Registration successful", savedStudent));
            
        } catch (RuntimeException e) {
            logger.error("Registration failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error during registration", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "An unexpected error occurred"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody Student student) {
        try {
            logger.debug("Login request received for username: {}", student.getUsername());
            
            if (student.getUsername() == null || student.getUsername().trim().isEmpty() ||
                student.getPassword() == null || student.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Username and password are required"));
            }

            Student existingStudent = studentService.findByUsername(student.getUsername());
            if (existingStudent != null && existingStudent.getPassword().equals(student.getPassword())) {
                return ResponseEntity.ok(new ApiResponse(true, "Login successful", existingStudent));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse(false, "Invalid credentials"));
            
        } catch (Exception e) {
            logger.error("Unexpected error during login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "An unexpected error occurred"));
        }
    }
}
