package com.noter.noter_1_0.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.noter.noter_1_0.Entity.Student;
import com.noter.noter_1_0.Models.StudentRepository;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student findByUsername(String username) {
        return studentRepository.findByUsername(username);
    }
}