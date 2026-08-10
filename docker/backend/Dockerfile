#Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#Runtime stage
FROM amazoncorretto:18
#define few things
ARG PROFILE=dev
ARG APP_VERSION=1.0.0


WORKDIR /app
COPY --from=build /build/target/bsn-network-backend-*.jar /app/
EXPOSE 8080

ENV DB_URL=jdbc:postgresql://postgres-sql-bsn:5432/book_social_network
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV EMAIL_HOSTNAME=mon_host
ENV EMAIL_USERNAME=mon_username
ENV EMAIL_PASSWORD=mon_password

#CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} bsn-network-backend-${JAR_VERSION}.jar
#CMD ["java", "-Dspring.profiles.active=${ACTIVE_PROFILE}", "-Dspring.datasource.url=${DB_URL}", "-jar", "bsn-network-backend-${JAR_VERSION}.jar"]
CMD ["sh", "-c", "java -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} -jar bsn-network-backend-${JAR_VERSION}.jar"]