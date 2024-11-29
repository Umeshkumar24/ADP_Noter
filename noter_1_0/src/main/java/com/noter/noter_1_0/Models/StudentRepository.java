package com.noter.noter_1_0.Models;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noter.noter_1_0.Entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Student findByUsername(String username);
}