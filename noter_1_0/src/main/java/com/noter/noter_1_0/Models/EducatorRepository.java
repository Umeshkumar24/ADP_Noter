package com.noter.noter_1_0.Models;

import org.springframework.data.jpa.repository.JpaRepository;
import com.noter.noter_1_0.Educator;

public interface EducatorRepository extends JpaRepository<Educator, Long> {
    Educator findByUsername(String username);
}