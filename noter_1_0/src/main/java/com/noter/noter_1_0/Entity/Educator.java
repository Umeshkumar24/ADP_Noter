package com.noter.noter_1_0.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "educator")
public class Educator {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "educator_seq")
    @SequenceGenerator(name = "educator_seq", sequenceName = "educator_seq", allocationSize = 1)
    private Long id;

    @Column(unique = true, nullable = false, length = 255)
    private String username;
    
    @Column(nullable = false, length = 255)
    private String password;

    @Transient
    private String role;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}