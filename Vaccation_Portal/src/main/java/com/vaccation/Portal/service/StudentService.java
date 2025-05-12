package com.vaccation.Portal.service;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import com.vaccation.Portal.entity.Student;
import com.vaccation.Portal.entity.VaccinationRecord;
import com.vaccation.Portal.exceptions.ResourceNotFoundException;
import com.vaccation.Portal.repository.StudentRepository;
import com.vaccation.Portal.repository.VaccinationRecordRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private VaccinationRecordRepository vaccinationRecordRepository;

    // Method to fetch all students
    public List<Student> exportAllStudents() {
        return studentRepository.findAll();
    }

 // Method to convert list of students to CSV
    public byte[] convertToCSV(List<Student> students) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (Writer writer = new OutputStreamWriter(byteArrayOutputStream)) {
            // Writing the header row for CSV
            writer.write("ID,Name,Class,StudentID,VaccinatedStatus\n");

            // Writing data rows for each student
            for (Student student : students) {
                writer.write(student.getId() + "," + student.getName() + "," +
                        student.getClassName() + "," + student.getStudentId() + "," +
                        student.getVaccinatedStatus() + "\n");
            }
        }
        return byteArrayOutputStream.toByteArray(); // Returning the CSV as byte array
    }
    
    
    
    
    public List<String> importStudentsFromCSV(MultipartFile file) throws IOException {
        List<Student> students = new ArrayList<>();
        List<String> existingStudentsMessages = new ArrayList<>();

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            String line;
            boolean isFirstLine = true;

            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] fields = line.split(",", -1); // Ensure all columns are captured

                // Validation for malformed lines
                if (fields.length != 5) {  // Update this based on the actual number of columns expected
                    System.out.println("Invalid line: " + line); // Log the invalid line
                    throw new IOException("Invalid file format. Each line must have exactly 5 columns.");
                }

                String vaccinatedStatus = fields[4].equalsIgnoreCase("true") ? "Done" : "Pending";

                Optional<Student> existingStudentOpt = studentRepository.findByStudentId(fields[3]);

                if (existingStudentOpt.isPresent()) {
                    existingStudentsMessages.add("Student with ID " + fields[3] + " already exists.");
                } else {
                    students.add(new Student(null, fields[1], fields[2], fields[3], vaccinatedStatus));
                }
            }
        }

        // Save new students
        try {
            studentRepository.saveAll(students);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save students", e);
        }

        return existingStudentsMessages;
    }


    public Student addStudent(Student student) {
        Optional<Student> existingStudent = studentRepository.findByStudentId(student.getStudentId());

        if (existingStudent.isPresent()) {
            // Student already exists — throw a custom exception
            throw new IllegalArgumentException("Student with ID " + student.getStudentId() + " already exists");
        }

        // Set vaccinated status
        if (student.getVaccinatedStatus() == null || student.getVaccinatedStatus().isEmpty()) {
            student.setVaccinatedStatus("Pending");
        } else if (student.getVaccinatedStatus().equalsIgnoreCase("true")) {
            student.setVaccinatedStatus("Done");
        }

        return studentRepository.save(student);
    }



    
    public Student updateStudent(Long id, Student updatedStudent) {
        Student existing = studentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        existing.setName(updatedStudent.getName());
        existing.setClassName(updatedStudent.getClassName());
        existing.setStudentId(updatedStudent.getStudentId());
        existing.setVaccinatedStatus(updatedStudent.getVaccinatedStatus());

        return studentRepository.save(existing);
    }

    public List<Student> getStudentsByVaccinationStatus(String status) {
        return studentRepository.findByVaccinatedStatus(status);
    }
    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Student> searchStudentsByClassName(String className) {
        return studentRepository.findByClassNameContainingIgnoreCase(className);
    }

    public List<Student> searchStudentsByStudentId(String studentId) {
        return studentRepository.findByStudentIdContainingIgnoreCase(studentId);
    }


    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));

        studentRepository.delete(student);
    }
	
 // Updated markVaccinated method with correct student ID check
    public void markVaccinated(String studentId, String vaccineName, String driveId) {
        Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));

        if (vaccinationRecordRepository.existsByStudentAndVaccineNameAndDriveId(student, vaccineName, driveId)) {
            throw new IllegalArgumentException("Student already vaccinated with " + vaccineName + " in this drive.");
        }

        VaccinationRecord record = new VaccinationRecord();
        record.setStudent(student);
        record.setVaccineName(vaccineName);
        record.setDriveId(driveId);
        record.setVaccinationDate(LocalDate.now());

        vaccinationRecordRepository.save(record);
        student.setVaccinatedStatus("Done"); studentRepository.save(student);
    }

    // Updated getVaccinationRecords method
    public List<VaccinationRecord> getVaccinationRecords(String studentId) {
        Student student = studentRepository.findByStudentId(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found"));
        return vaccinationRecordRepository.findByStudent(student);
    }

}



