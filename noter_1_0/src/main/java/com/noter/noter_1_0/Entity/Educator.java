package com.noter.noter_1_0.Entity;

import org.hibernate.annotations.CollectionId;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Educator {
    @Id
    @CollectionId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    private String password;

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }
}