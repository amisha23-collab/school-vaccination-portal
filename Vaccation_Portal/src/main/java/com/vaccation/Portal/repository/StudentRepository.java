package com.vaccation.Portal.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaccation.Portal.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {
	 Optional<Student> findByStudentId(String studentId);
    //long countByVaccinatedTrue();
	long countByVaccinatedStatus(String status); // Corrected method
	List<Student> findByVaccinatedStatus(String vaccinatedStatus);
	List<Student> findByNameContainingIgnoreCase(String name);
	List<Student> findByClassNameContainingIgnoreCase(String className);
	List<Student> findByStudentIdContainingIgnoreCase(String studentId);

}

