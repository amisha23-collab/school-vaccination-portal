# 📘 School Vaccination Portal

## 👨‍🏫 Project Overview

The School Vaccination Portal is a web-based application that enables school coordinators to manage vaccination efforts effectively. This application allows the management of student records, vaccination drives, vaccination statuses, and the generation of various reports. The backend is built using Spring Boot (Java) and MySQL/PostgreSQL, while the frontend is designed using Angular or React.js. Communication between the client and server happens through REST APIs in JSON format.

**Tech Stack:**

* **Backend:** Spring Boot (Java), MySQL, JPA, Hibernate
* **Frontend:** Angular 19
* **Data Exchange:** REST API (JSON)
* **Authentication:** Authentication is Done for admin role type users only.

---

## 🧱 Architecture Overview

```
Frontend (Angular/React.js)
    ↕ REST API calls (HttpClient)
Backend (Spring Boot)
    ↕ JPA Repositories
Database (MySQL)

```

---

## 🔐 Simulated Authentication

* The application assumes that the user is logged in as a school coordinator(Admin).
* Basic authentication is simulated and secure (used Basic spring security for demo purpose).

---

## 📊 Features Implemented (User Stories)

### 1. Dashboard

* Metrics: total students, vaccinated students, vaccination rate/percentage
* Upcoming drives (within 30 days)
* Graceful message if no drives are available

### 2. Student Management

* Add individual students
* Bulk upload via CSV (`ID,StudentID,Name,Class,Status,Actions` headers)
* Search by name/class/studentId,Status
* Mark students as vaccinated

### 3. Vaccination Drives

* Create new drive with validation (at least 15 days in future)
* Prevent overlapping drives (on same date)
* Edit future drives only
* Display upcoming drives

### 4. Reports

* List of all vaccination records
* Download report as CSV
* Table with pagination (frontend-controlled)

---

## 🧪 API Endpoints

### Students

* `GET /admin/student` – List all students
* `GET /admin/student/{id}` – Get student by their id(Also there for class,name,studentId,status).
* `POST /admin/student` – Add one student
* `PUT /admin/student/{id}` – Update student by id 
* `DELETE /admin/student/{id}` – Delete student by id 
* `POST /admin/student/import` – Bulk upload
* `GET /admin/student/export` – download reports of the students 
* `POST /admin/student/{id}/vaccinate` – Mark vaccinated
* `GET /admin/student/{studentId}/vaccinate` – To get records of vaccinated student by StyudentId

### Drives

* `GET /admin/{id}` – Get drive by id
* `POST /admin` – Create new drive
* `PUT /admin/{id}` – Edit drive
* `GET /admin` – Get Drives within 30 days

### Records

* `GET /admin/` – List all vaccination records
* `POST /admin` – Create vaccination record

### Dashboard

* `GET /admin/api/dashboard` – Summary metrics & upcoming drives

---

## 🧾 Database Schema

### Student

* `id`: Long
* `name`: String
* `className`: String
* `studentId`: String
* `vaccinatedStatus`: String

### VaccinationRecord

* `id`: Long
* `student`: FK to Student
* `vaccineName`: String
* `driveId`: String
* `vaccinationDate`: LocalDate

### VaccineDrive

* `id`: Long
* `vaccineName`: String
* `date`: LocalDate
* `availableDoses`: int
* `applicableClasses`: List<String>
* `status`: DriveStatus.Active(this is Enum which has Active,Cancelled,Complete)



---

## 🛠 Setup Instructions

### Backend (Spring Boot)

```bash
cd backend
./mvnw spring-boot:run
```

Ensure MSQL is running and configured in `application.properties`:

```properties
spring.application.name=VacationPortal
# MySQL Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/school_vaccination
spring.datasource.username=username
spring.datasource.password=password
# JPA / Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.show-sql=true

server.port=8080
# Server Error Settings
server.error.include-message=always
server.error.include-binding-errors=always

```

Create database:

```sql
CREATE DATABASE vaccination_db;
```

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve
```

Ensure your HttpClient services use the correct backend URL in API calls. For example:

```// Example API call without proxy
this.http.get('http://localhost:8080/api/students');

Make sure CORS is properly configured in your Spring Boot application if your frontend and backend are running on different ports.

```

---

## Output Screenshots 

* Dashboard metrics and drive list
* Student list with vaccination status
* CSV upload interface
* Vaccination report table with download button(export students button)


---

## 🔗 GitHub Repository Structure

```
Vaccation_portal/         # Spring Boot app
Vaccination-portal/        # React app
README.md        # This file
```

---

## ✅ Assumptions

* Only one vaccination record per student per vaccine drive is allowed
* CSV upload expects exact headers: `name`, `studentClass`,etc.
* Authentication is Done for admin role type users only(secure, for login/signup purposes , used Basic Autentication(Basic Spring Security)).

---

## 📌 References

* Angular Docs: https://angular.io
* Spring Boot Docs: https://spring.io/projects/spring-boot
* MySQL Docs: https://dev.mysql.com/doc/
* PapaParse CSV Parser: https://www.papaparse.com/



---


