FROM eclipse-temurin:latest
COPY target/my-app-1.0-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
EXPOSE 9090
