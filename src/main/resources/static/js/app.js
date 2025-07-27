// Task Manager Frontend JavaScript

class TaskManager {
    constructor() {
        this.apiBase = '/api/tasks';
        this.tasks = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadTasks();
    }

    initializeElements() {
        // Form elements
        this.taskForm = document.getElementById('taskForm');
        this.taskTitle = document.getElementById('taskTitle');
        this.taskDescription = document.getElementById('taskDescription');
        
        // Control elements
        this.statusFilter = document.getElementById('statusFilter');
        this.searchInput = document.getElementById('searchInput');
        this.clearSearchBtn = document.getElementById('clearSearch');
        
        // Display elements
        this.tasksContainer = document.getElementById('tasksContainer');
        this.tasksList = document.getElementById('tasksList');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.noTasks = document.getElementById('noTasks');
        this.taskCount = document.getElementById('taskCount');
        
        // Modal elements
        this.editModal = document.getElementById('editModal');
        this.editForm = document.getElementById('editTaskForm');
        this.editTaskId = document.getElementById('editTaskId');
        this.editTaskTitle = document.getElementById('editTaskTitle');
        this.editTaskDescription = document.getElementById('editTaskDescription');
        this.editTaskCompleted = document.getElementById('editTaskCompleted');
        this.closeModal = document.querySelector('.close');
        this.cancelEdit = document.getElementById('cancelEdit');
    }

    attachEventListeners() {
        // Form submission
        this.taskForm.addEventListener('submit', (e) => this.handleAddTask(e));
        this.editForm.addEventListener('submit', (e) => this.handleEditTask(e));
        
        // Controls
        this.statusFilter.addEventListener('change', () => this.handleFilterChange());
        this.searchInput.addEventListener('input', () => this.handleSearch());
        this.clearSearchBtn.addEventListener('click', () => this.clearSearch());
        
        // Modal controls
        this.closeModal.addEventListener('click', () => this.closeEditModal());
        this.cancelEdit.addEventListener('click', () => this.closeEditModal());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });
    }

    async loadTasks() {
        try {
            this.showLoading();
            const response = await fetch(this.apiBase);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            this.tasks = await response.json();
            this.renderTasks();
        } catch (error) {
            console.error('Error loading tasks:', error);
            this.showError('Failed to load tasks. Please try again.');
        }
    }

    async handleAddTask(e) {
        e.preventDefault();
        
        const title = this.taskTitle.value.trim();
        const description = this.taskDescription.value.trim();
        
        if (!title) {
            this.showError('Please enter a task title.');
            return;
        }

        try {
            const response = await fetch(this.apiBase, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const newTask = await response.json();
            this.tasks.push(newTask);
            this.renderTasks();
            this.taskForm.reset();
            this.showSuccess('Task added successfully!');
        } catch (error) {
            console.error('Error adding task:', error);
            this.showError('Failed to add task. Please try again.');
        }
    }

    async handleEditTask(e) {
        e.preventDefault();
        
        const id = parseInt(this.editTaskId.value);
        const title = this.editTaskTitle.value.trim();
        const description = this.editTaskDescription.value.trim();
        const completed = this.editTaskCompleted.checked;
        
        if (!title) {
            this.showError('Please enter a task title.');
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    completed: completed
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTask = await response.json();
            const index = this.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
            
            this.renderTasks();
            this.closeEditModal();
            this.showSuccess('Task updated successfully!');
        } catch (error) {
            console.error('Error updating task:', error);
            this.showError('Failed to update task. Please try again.');
        }
    }

    async deleteTask(id) {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            const response = await fetch(`${this.apiBase}/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            this.tasks = this.tasks.filter(task => task.id !== id);
            this.renderTasks();
            this.showSuccess('Task deleted successfully!');
        } catch (error) {
            console.error('Error deleting task:', error);
            this.showError('Failed to delete task. Please try again.');
        }
    }

    async toggleTask(id) {
        try {
            const response = await fetch(`${this.apiBase}/${id}/toggle`, {
                method: 'PATCH'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedTask = await response.json();
            const index = this.tasks.findIndex(task => task.id === id);
            if (index !== -1) {
                this.tasks[index] = updatedTask;
            }
            
            this.renderTasks();
            this.showSuccess(`Task marked as ${updatedTask.completed ? 'completed' : 'pending'}!`);
        } catch (error) {
            console.error('Error toggling task:', error);
            this.showError('Failed to update task status. Please try again.');
        }
    }

    openEditModal(task) {
        this.editTaskId.value = task.id;
        this.editTaskTitle.value = task.title;
        this.editTaskDescription.value = task.description || '';
        this.editTaskCompleted.checked = task.completed;
        this.editModal.style.display = 'block';
    }

    closeEditModal() {
        this.editModal.style.display = 'none';
        this.editForm.reset();
    }

    handleFilterChange() {
        this.currentFilter = this.statusFilter.value;
        this.renderTasks();
    }

    handleSearch() {
        this.searchTerm = this.searchInput.value.toLowerCase().trim();
        this.renderTasks();
    }

    clearSearch() {
        this.searchInput.value = '';
        this.searchTerm = '';
        this.renderTasks();
    }

    getFilteredTasks() {
        let filteredTasks = [...this.tasks];

        // Apply status filter
        if (this.currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        } else if (this.currentFilter === 'pending') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        }

        // Apply search filter
        if (this.searchTerm) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(this.searchTerm) ||
                (task.description && task.description.toLowerCase().includes(this.searchTerm))
            );
        }

        return filteredTasks;
    }

    renderTasks() {
        const filteredTasks = this.getFilteredTasks();
        
        this.hideLoading();
        this.updateTaskCount(filteredTasks.length);
        
        if (filteredTasks.length === 0) {
            this.showNoTasks();
            return;
        }
        
        this.hideNoTasks();
        
        this.tasksList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
    }

    createTaskHTML(task) {
        const statusClass = task.completed ? 'completed' : '';
        const statusText = task.completed ? 'Completed' : 'Pending';
        const statusBadgeClass = task.completed ? 'completed' : '';
        
        return `
            <div class="task-item ${statusClass}" data-id="${task.id}">
                <div class="task-header">
                    <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    <span class="task-status ${statusBadgeClass}">${statusText}</span>
                </div>
                ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                <div class="task-actions">
                    <button class="btn btn-sm btn-success" onclick="taskManager.toggleTask(${task.id})">
                        <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                        ${task.completed ? 'Mark Pending' : 'Mark Complete'}
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="taskManager.openEditModal(${JSON.stringify(task).replace(/"/g, '&quot;')})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="taskManager.deleteTask(${task.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    }

    updateTaskCount(count) {
        const taskText = count === 1 ? 'task' : 'tasks';
        this.taskCount.textContent = `${count} ${taskText}`;
    }

    showLoading() {
        this.loadingSpinner.style.display = 'block';
        this.tasksList.style.display = 'none';
        this.noTasks.style.display = 'none';
    }

    hideLoading() {
        this.loadingSpinner.style.display = 'none';
        this.tasksList.style.display = 'block';
    }

    showNoTasks() {
        this.noTasks.style.display = 'block';
        this.tasksList.style.display = 'none';
    }

    hideNoTasks() {
        this.noTasks.style.display = 'none';
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles if not already added
        this.ensureNotificationStyles();
        
        // Add to page
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    ensureNotificationStyles() {
        if (document.querySelector('#notification-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                z-index: 2000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                display: flex;
                align-items: center;
                gap: 10px;
                max-width: 300px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: linear-gradient(135deg, #10b981, #059669);
            }
            
            .notification-error {
                background: linear-gradient(135deg, #ef4444, #dc2626);
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    transform: translateY(-100px);
                    max-width: none;
                }
                
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(styles);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
});

// Add some sample tasks for demonstration (only if no tasks exist)
setTimeout(async () => {
    try {
        const response = await fetch('/api/tasks');
        const tasks = await response.json();
        
        if (tasks.length === 0) {
            // Add sample tasks
            const sampleTasks = [
                {
                    title: "Welcome to Task Manager!",
                    description: "This is a sample task to get you started. You can edit, complete, or delete this task."
                },
                {
                    title: "Create your first task",
                    description: "Use the form above to create your own tasks and manage your to-do list."
                },
                {
                    title: "Explore the features",
                    description: "Try filtering tasks, searching, and using the edit functionality."
                }
            ];
            
            for (const task of sampleTasks) {
                await fetch('/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(task)
                });
            }
            
            // Reload tasks to show the samples
            if (window.taskManager) {
                window.taskManager.loadTasks();
            }
        }
    } catch (error) {
        console.log('Could not load or create sample tasks:', error);
    }
}, 1000);