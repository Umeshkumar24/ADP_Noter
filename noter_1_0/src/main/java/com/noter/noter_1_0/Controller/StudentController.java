package com.noter.noter_1_0.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.noter.noter_1_0.Student;
import com.noter.noter_1_0.Services.StudentService;

@RestController
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
