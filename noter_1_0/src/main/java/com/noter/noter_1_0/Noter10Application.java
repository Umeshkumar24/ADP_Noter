package com.noter.noter_1_0;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Noter10Application {

	public static void main(String[] args) {

		// String url = "jdbc:oracle:thin:@192.168.29.187:1521/XE";
		// String username = "UMESH";
		// String password = "1234";
		// if (DatabaseConnectionChecker.isDatabaseConnected(url, username, password)) {
			SpringApplication.run(Noter10Application.class, args);
		// } else {
		// 	System.err.println("Failed to connect to the database. Application will not start.");
		// }
	}
}
