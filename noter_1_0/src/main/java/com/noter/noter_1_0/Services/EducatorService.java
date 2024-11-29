package com.noter.noter_1_0.Services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noter.noter_1_0.Entity.Educator;
import com.noter.noter_1_0.Models.EducatorRepository;

@Service
public class EducatorService {
    private static final Logger logger = LoggerFactory.getLogger(EducatorService.class);
    
    @Autowired
    private EducatorRepository educatorRepository;

    public Educator loginEducator(Educator educator) {
        logger.debug("Attempting to login educator with username: {}", educator.getUsername());
        
        Educator existingEducator = educatorRepository.findByUsername(educator.getUsername());
        
        if (existingEducator == null) {
            logger.debug("No educator found with username: {}", educator.getUsername());
            throw new RuntimeException("Educator not found");
        }
        
        if (!existingEducator.getPassword().equals(educator.getPassword())) {
            logger.debug("Invalid password for username: {}", educator.getUsername());
            throw new RuntimeException("Invalid credentials");
        }
        
        logger.debug("Login successful for educator: {}", educator.getUsername());
        return existingEducator;
    }

    public Educator saveEducator(Educator educator) {
        logger.debug("Attempting to save educator with username: {}", educator.getUsername());
        
        Educator existingEducator = educatorRepository.findByUsername(educator.getUsername());
        if (existingEducator != null) {
            logger.debug("Educator already exists with username: {}", educator.getUsername());
            throw new RuntimeException("Username already exists");
        }
        
        Educator savedEducator = educatorRepository.save(educator);
        logger.debug("Successfully saved educator with username: {}", educator.getUsername());
        return savedEducator;
    }
}