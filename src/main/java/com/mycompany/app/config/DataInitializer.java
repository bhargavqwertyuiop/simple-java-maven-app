package com.mycompany.app.config;

import com.mycompany.app.model.Task;
import com.mycompany.app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Data initializer to populate the database with sample data
 */
@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only add sample data if no tasks exist
        if (taskRepository.count() == 0) {
            // Create sample tasks
            Task task1 = new Task("Welcome to Task Manager!", 
                "This is a sample task to demonstrate the full-stack Java application. You can edit, complete, or delete this task.");
            
            Task task2 = new Task("Learn Spring Boot", 
                "Explore the Spring Boot framework and understand how it simplifies Java development.");
            
            Task task3 = new Task("Build REST APIs", 
                "Practice creating RESTful web services with proper HTTP methods and status codes.");
            
            Task task4 = new Task("Master Frontend Integration", 
                "Learn how to connect frontend JavaScript with backend REST APIs.");
            
            // Mark one task as completed for demonstration
            task4.setCompleted(true);
            
            // Save all tasks
            taskRepository.save(task1);
            taskRepository.save(task2);
            taskRepository.save(task3);
            taskRepository.save(task4);
            
            System.out.println("Sample tasks initialized successfully!");
        }
    }
}