# Task Manager - Full-Stack Java Application

A modern, full-stack task management application built with **Spring Boot** backend and **HTML/CSS/JavaScript** frontend.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.1-green)
![Maven](https://img.shields.io/badge/Maven-3.9.2+-blue)
![H2 Database](https://img.shields.io/badge/Database-H2-lightblue)

## Features

### Backend (Spring Boot)
- ✅ **RESTful API** with full CRUD operations
- ✅ **Spring Data JPA** for database operations
- ✅ **H2 In-Memory Database** for easy setup
- ✅ **Comprehensive error handling**
- ✅ **Data validation and constraints**
- ✅ **Sample data initialization**

### Frontend (HTML/CSS/JavaScript)
- ✅ **Modern, responsive UI** with CSS Grid and Flexbox
- ✅ **Interactive task management** (add, edit, delete, toggle completion)
- ✅ **Real-time filtering** by status (all, pending, completed)
- ✅ **Search functionality** by title and description
- ✅ **Modal-based editing** with smooth animations
- ✅ **Toast notifications** for user feedback
- ✅ **Mobile-responsive design**

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks/{id}` | Get task by ID |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/{id}` | Update task |
| `DELETE` | `/api/tasks/{id}` | Delete task |
| `PATCH` | `/api/tasks/{id}/toggle` | Toggle task completion |
| `GET` | `/api/tasks/status?completed=true/false` | Filter by status |
| `GET` | `/api/tasks/search?title=query` | Search tasks |

## Project Structure

```
src/
├── main/
│   ├── java/com/mycompany/app/
│   │   ├── App.java                    # Main Spring Boot application
│   │   ├── config/
│   │   │   └── DataInitializer.java    # Sample data setup
│   │   ├── controller/
│   │   │   ├── TaskController.java     # REST API endpoints
│   │   │   └── WebController.java      # Frontend route handler
│   │   ├── model/
│   │   │   └── Task.java               # Task entity model
│   │   ├── repository/
│   │   │   └── TaskRepository.java     # Data access layer
│   │   └── service/
│   │       └── TaskService.java        # Business logic layer
│   └── resources/
│       ├── static/
│       │   ├── css/
│       │   │   └── style.css           # Modern, responsive styles
│       │   └── js/
│       │       └── app.js              # Frontend JavaScript logic
│       ├── templates/
│       │   └── index.html              # Main HTML template
│       ├── application.properties      # Spring Boot configuration
│       └── application-test.properties # Test configuration
└── test/
    └── java/com/mycompany/app/
        └── AppTest.java                # Integration tests
```

## Getting Started

### Prerequisites

- **Java 17** or higher
- **Maven 3.9.2** or higher
- **Git** (for cloning)

### Installation & Running

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Build the application**:
   ```bash
   mvn clean compile
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**:
   - **Frontend**: [http://localhost:8080](http://localhost:8080)
   - **API**: [http://localhost:8080/api/tasks](http://localhost:8080/api/tasks)
   - **H2 Database Console**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
     - JDBC URL: `jdbc:h2:mem:taskdb`
     - Username: `sa`
     - Password: `password`

### Building for Production

```bash
# Create executable JAR
mvn clean package

# Run the JAR
java -jar target/my-app-1.0-SNAPSHOT.jar
```

## Development

### Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=AppTest
```

### API Testing

You can test the API using curl or any REST client:

```bash
# Get all tasks
curl -X GET http://localhost:8080/api/tasks

# Create a new task
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description"}'

# Update a task
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated description","completed":true}'

# Delete a task
curl -X DELETE http://localhost:8080/api/tasks/1

# Toggle task completion
curl -X PATCH http://localhost:8080/api/tasks/1/toggle
```

## Technology Stack

### Backend
- **Spring Boot 3.2.1** - Main framework
- **Spring Web** - REST API support
- **Spring Data JPA** - Database abstraction
- **H2 Database** - In-memory database
- **Spring DevTools** - Development utilities
- **Maven** - Build tool

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Grid/Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## Features in Detail

### Task Management
- **Create Tasks**: Add new tasks with title and optional description
- **Edit Tasks**: Modify existing tasks including completion status
- **Delete Tasks**: Remove tasks with confirmation
- **Toggle Completion**: Quick status change with visual feedback

### User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern Styling**: Clean, professional appearance with animations
- **Real-time Feedback**: Toast notifications for all actions
- **Intuitive Controls**: Clear buttons and form elements

### Data Persistence
- **Automatic Schema Creation**: Database tables created on startup
- **Sample Data**: Pre-loaded tasks for demonstration
- **In-Memory Database**: No setup required, data resets on restart

## Configuration

### Database Configuration
The application uses H2 in-memory database by default. To use a persistent database, update `application.properties`:

```properties
# For persistent H2 database
spring.datasource.url=jdbc:h2:file:./data/taskdb

# For MySQL (example)
# spring.datasource.url=jdbc:mysql://localhost:3306/taskdb
# spring.datasource.username=root
# spring.datasource.password=yourpassword
# spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### Port Configuration
Change the server port in `application.properties`:

```properties
server.port=9090
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.

## Support

If you have any questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using Spring Boot and Modern Web Technologies**
