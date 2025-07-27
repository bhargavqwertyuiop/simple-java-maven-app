#!/bin/bash

echo "=========================================="
echo "  Task Manager - Full-Stack Java App Demo"
echo "=========================================="
echo ""

echo "🚀 Application is running on: http://localhost:8080"
echo ""

echo "📋 Testing REST API Endpoints:"
echo ""

echo "1. GET /api/tasks - Fetching all tasks:"
curl -s http://localhost:8080/api/tasks | jq '.[0:3]' 2>/dev/null || curl -s http://localhost:8080/api/tasks | head -3
echo ""
echo ""

echo "2. POST /api/tasks - Creating a new task:"
NEW_TASK=$(curl -s -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Demo Task","description":"Created by demo script","completed":false}')
echo "$NEW_TASK"
echo ""

# Extract the ID from the response
TASK_ID=$(echo "$NEW_TASK" | grep -o '"id":[0-9]*' | grep -o '[0-9]*')
echo "3. GET /api/tasks/{id} - Fetching task by ID ($TASK_ID):"
curl -s http://localhost:8080/api/tasks/$TASK_ID
echo ""
echo ""

echo "4. PUT /api/tasks/{id} - Updating task:"
curl -s -X PUT http://localhost:8080/api/tasks/$TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Demo Task","description":"Updated by demo script","completed":true}'
echo ""
echo ""

echo "5. DELETE /api/tasks/{id} - Deleting task:"
curl -s -X DELETE http://localhost:8080/api/tasks/$TASK_ID
echo ""
echo ""

echo "🌐 Frontend Features:"
echo "  ✅ Responsive web interface"
echo "  ✅ Add, edit, and delete tasks"
echo "  ✅ Mark tasks as complete/incomplete"
echo "  ✅ Search and filter functionality"
echo "  ✅ Real-time UI updates"
echo ""

echo "🔧 Backend Features:"
echo "  ✅ Spring Boot REST API"
echo "  ✅ JPA/Hibernate data persistence"
echo "  ✅ H2 in-memory database"
echo "  ✅ CRUD operations"
echo "  ✅ Data validation"
echo ""

echo "📂 Application Structure:"
echo "  📁 Backend: Spring Boot (Java)"
echo "  📁 Frontend: HTML/CSS/JavaScript"
echo "  📁 Database: H2 (In-Memory)"
echo "  📁 Build Tool: Maven"
echo ""

echo "🌟 Access the application:"
echo "  🖥️  Frontend: http://localhost:8080"
echo "  🔗 API: http://localhost:8080/api/tasks"
echo "  🗄️  H2 Console: http://localhost:8080/h2-console"
echo "     (URL: jdbc:h2:mem:taskdb, User: sa, Password: password)"
echo ""

echo "=========================================="