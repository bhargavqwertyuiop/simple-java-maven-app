package com.mycompany.app.service;

import com.mycompany.app.model.Task;
import com.mycompany.app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for Task business logic
 */
@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    /**
     * Get all tasks
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Get task by ID
     */
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    /**
     * Create a new task
     */
    public Task createTask(Task task) {
        task.setCompleted(false); // Ensure new tasks are not completed
        return taskRepository.save(task);
    }

    /**
     * Update an existing task
     */
    public Task updateTask(Long id, Task taskDetails) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(taskDetails.getTitle());
            task.setDescription(taskDetails.getDescription());
            task.setCompleted(taskDetails.getCompleted());
            return taskRepository.save(task);
        }
        return null;
    }

    /**
     * Delete a task
     */
    public boolean deleteTask(Long id) {
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Toggle task completion status
     */
    public Task toggleTaskCompletion(Long id) {
        Optional<Task> optionalTask = taskRepository.findById(id);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setCompleted(!task.getCompleted());
            return taskRepository.save(task);
        }
        return null;
    }

    /**
     * Get tasks by completion status
     */
    public List<Task> getTasksByStatus(Boolean completed) {
        return taskRepository.findByCompleted(completed);
    }

    /**
     * Search tasks by title
     */
    public List<Task> searchTasksByTitle(String title) {
        return taskRepository.findByTitleContainingIgnoreCase(title);
    }
}