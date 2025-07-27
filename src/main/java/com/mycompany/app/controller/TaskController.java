package com.mycompany.app.controller;

import com.mycompany.app.model.Task;
import com.mycompany.app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Task operations
 */
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    /**
     * Get all tasks
     */
    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    /**
     * Get task by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
        Optional<Task> task = taskService.getTaskById(id);
        return task.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Create a new task
     */
    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
    }

    /**
     * Update an existing task
     */
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task taskDetails) {
        Task updatedTask = taskService.updateTask(id, taskDetails);
        return updatedTask != null ? ResponseEntity.ok(updatedTask) 
                                   : ResponseEntity.notFound().build();
    }

    /**
     * Delete a task
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        boolean deleted = taskService.deleteTask(id);
        return deleted ? ResponseEntity.noContent().build() 
                       : ResponseEntity.notFound().build();
    }

    /**
     * Toggle task completion status
     */
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Task> toggleTaskCompletion(@PathVariable Long id) {
        Task toggledTask = taskService.toggleTaskCompletion(id);
        return toggledTask != null ? ResponseEntity.ok(toggledTask) 
                                   : ResponseEntity.notFound().build();
    }

    /**
     * Get tasks by completion status
     */
    @GetMapping("/status")
    public ResponseEntity<List<Task>> getTasksByStatus(@RequestParam Boolean completed) {
        List<Task> tasks = taskService.getTasksByStatus(completed);
        return ResponseEntity.ok(tasks);
    }

    /**
     * Search tasks by title
     */
    @GetMapping("/search")
    public ResponseEntity<List<Task>> searchTasks(@RequestParam String title) {
        List<Task> tasks = taskService.searchTasksByTitle(title);
        return ResponseEntity.ok(tasks);
    }
}