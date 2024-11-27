package com.noter.noter_1_0;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnectionChecker {
    public static boolean isDatabaseConnected(String url, String username, String password) {
        try (Connection connection = DriverManager.getConnection(url, username, password)) {
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}

