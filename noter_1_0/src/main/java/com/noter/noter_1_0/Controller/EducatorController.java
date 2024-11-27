package com.noter.noter_1_0.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noter.noter_1_0.Educator;
import com.noter.noter_1_0.Services.EducatorService;

@RestController
@RequestMapping("/api/educators")
public class EducatorController {
    @Autowired
    private EducatorService educatorService;

    @PostMapping("/register")
    public Educator registerEducator(@RequestBody Educator educator) {
        return educatorService.saveEducator(educator);
    }

    @PostMapping("/login")
    public Educator loginEducator(@RequestBody Educator educator) {
        Educator existingEducator = educatorService.findByUsername(educator.getUsername());
        if (existingEducator != null && existingEducator.getPassword().equals(educator.getPassword())) {
            return existingEducator;
        }
        throw new RuntimeException("Invalid credentials");
    }
}