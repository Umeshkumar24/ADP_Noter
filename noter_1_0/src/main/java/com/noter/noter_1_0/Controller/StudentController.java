package com.noter.noter_1_0.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noter.noter_1_0.Entity.Student;
import com.noter.noter_1_0.Services.StudentService;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.29.187:9090"})
@RequestMapping("/api/students")

public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @PostMapping("/login")
    public Student loginStudent(@RequestBody Student student) {
        Student existingStudent = studentService.findByUsername(student.getUsername());
        if (existingStudent != null && existingStudent.getPassword().equals(student.getPassword())) {
            return existingStudent;
        }
        throw new RuntimeException("Invalid credentials");
    }
}
