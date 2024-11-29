package com.noter.noter_1_0.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.noter.noter_1_0.Entity.Educator;
import com.noter.noter_1_0.Services.EducatorService;

@RestController
@RequestMapping("/api/educators")
@CrossOrigin(origins = "http://localhost:3000")
public class EducatorController {
    private static final Logger logger = LoggerFactory.getLogger(EducatorController.class);

    @Autowired
    private EducatorService educatorService;

    @PostMapping("/login")
    public ResponseEntity<?> loginEducator(@RequestBody Educator educator) {
        try {
            logger.debug("Login request received for username: {}", educator.getUsername());
            
            if (educator.getUsername() == null || educator.getUsername().trim().isEmpty() ||
                educator.getPassword() == null || educator.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Username and password are required"));
            }

            Educator loggedInEducator = educatorService.loginEducator(educator);
            return ResponseEntity.ok(new ApiResponse(true, "Login successful", loggedInEducator));
            
        } catch (RuntimeException e) {
            logger.error("Login failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            logger.error("Unexpected error during login", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ApiResponse(false, "An unexpected error occurred"));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerEducator(@RequestBody Educator educator) {
        try {
            logger.debug("Registration request received for username: {}", educator.getUsername());
            
            if (educator.getUsername() == null || educator.getUsername().trim().isEmpty() ||
                educator.getPassword() == null || educator.getPassword().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Username and password are required"));
            }

            Educator savedEducator = educatorService.saveEducator(educator);
            return ResponseEntity.ok(new ApiResponse(true, "Registration successful", savedEducator));
            
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
}

class ApiResponse {
    private boolean success;
    private String message;
    private Object data;

    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponse(boolean success, String message, Object data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    // Getters and setters
    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Object getData() { return data; }
    public void setData(Object data) { this.data = data; }
}