package com.mycompany.app.repository;

import com.mycompany.app.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Task entity
 */
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    /**
     * Find all tasks by completion status
     */
    List<Task> findByCompleted(Boolean completed);
    
    /**
     * Find tasks by title containing the given text (case insensitive)
     */
    List<Task> findByTitleContainingIgnoreCase(String title);
}