package com.noter.noter_1_0.Models;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.noter.noter_1_0.Entity.Educator;

public interface EducatorRepository extends JpaRepository<Educator, Long> {
    @Query("SELECT e FROM Educator e WHERE e.username = :username")
    Educator findByUsername(@Param("username") String username);
}