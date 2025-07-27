package com.mycompany.app;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

/**
 * Integration tests for the Task Manager application
 */
@SpringBootTest
@ActiveProfiles("test")
public class AppTest {

    @Test
    public void contextLoads() {
        // Test that the Spring Boot application context loads successfully
    }
}
