package com.noter.noter_1_0.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noter.noter_1_0.Entity.Educator;
import com.noter.noter_1_0.Models.EducatorRepository;

@Service
public class EducatorService {
    @Autowired
    private EducatorRepository educatorRepository;

    public Educator saveEducator(Educator educator) {
        return educatorRepository.save(educator);
    }

    public Educator findByUsername(String username) {
        return educatorRepository.findByUsername(username);
    }
}