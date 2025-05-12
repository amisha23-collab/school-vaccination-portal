

package com.vaccation.Portal.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vaccation.Portal.entity.Student;
import com.vaccation.Portal.entity.VaccinationRecord;
import com.vaccation.Portal.exceptions.ResourceNotFoundException;
import com.vaccation.Portal.service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin/student")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")  // Ensure only ADMIN can access these endpoints
public class StudentController {

	    @Autowired
	    private StudentService studentService;

	    @GetMapping("/export")
	    public ResponseEntity<byte[]> exportStudentsToCSV() throws IOException {
	        List<Student> students = studentService.exportAllStudents();
	        byte[] csvData = studentService.convertToCSV(students);

	        return ResponseEntity.ok()
	            .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=students.csv")
	            .contentType(MediaType.APPLICATION_OCTET_STREAM)
	            .body(csvData);
	    }

	    @PostMapping("/import")
	    public ResponseEntity<List<String>> importStudentsFromCSV(@RequestParam("file") MultipartFile file) {
	        try {
	            List<String> messages = studentService.importStudentsFromCSV(file);
	            return ResponseEntity.ok(messages);
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(List.of("Invalid file format."));
	        }
	    }

	    @PostMapping
	    public ResponseEntity<?> addStudent(@RequestBody Student student) {
	        try {
	            Student savedStudent = studentService.addStudent(student);
	            return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
	        } catch (IllegalArgumentException e) {
	            // Handle duplicate student
	            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	        } catch (Exception e) {
	            // Handle unexpected errors
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
	        }
	    }
 

	    @PutMapping("/{id}")
	    public ResponseEntity<?> updateStudent(@PathVariable("id") Long id, @RequestBody Student student) {
	        try {
	            Student updated = studentService.updateStudent(id, student);
	            return ResponseEntity.ok(updated);
	        } catch (ResourceNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update failed");
	        }
	    }

	    @GetMapping
	    public ResponseEntity<?> getAllStudents() {
	        List<Student> students = studentService.getAllStudents();
	        return ResponseEntity.ok(students);
	    }

	    @GetMapping("/{id}")
	    public ResponseEntity<?> getStudentById(@PathVariable("id") Long id) {
	        try {
	            return ResponseEntity.ok(studentService.getStudentById(id));
	        } catch (ResourceNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        }
	    }
	    
	    @GetMapping("/status/{status}")
	    public ResponseEntity<List<Student>> getStudentsByVaccinationStatus(@PathVariable("status") String status) {
	        List<Student> students = studentService.getStudentsByVaccinationStatus(status);
	        return ResponseEntity.ok(students);
	    }
	    @GetMapping("/search/name")
	    public ResponseEntity<List<Student>> searchByName(@RequestParam("name") String name) {
	        return ResponseEntity.ok(studentService.searchStudentsByName(name));
	    }

	    @GetMapping("/search/class")
	    public ResponseEntity<List<Student>> searchByClass(@RequestParam("className") String className) {
	        return ResponseEntity.ok(studentService.searchStudentsByClassName(className));
	    }

	    @GetMapping("/search/studentId")
	    public ResponseEntity<List<Student>> searchByStudentId(@RequestParam("studentId") String studentId) {
	        return ResponseEntity.ok(studentService.searchStudentsByStudentId(studentId));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteStudent(@PathVariable("id") Long id) {
	        try {
	            studentService.deleteStudent(id);
	            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Student deleted successfully.");
	        } catch (ResourceNotFoundException e) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	        }
	    }
	    

	    @PostMapping("/{studentId}/vaccinate")
	    public ResponseEntity<?> markVaccinated(@PathVariable("studentId") String studentId,
	                                            @RequestParam("vaccineName") String vaccineName,
	                                            @RequestParam("driveId") String driveId) {
	        try {
	            studentService.markVaccinated(studentId, vaccineName, driveId);
	            return ResponseEntity.ok("Student vaccinated successfully");
	        } catch (IllegalArgumentException e) {
	            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
	        }
	    }


	    @GetMapping("/{studentId}/vaccination-records")
	    public ResponseEntity<List<VaccinationRecord>> getRecords(@PathVariable("studentId") String studentId) {
	        return ResponseEntity.ok(studentService.getVaccinationRecords(studentId));
	    }

	  
		
	}
