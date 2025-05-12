package com.vaccation.Portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vaccation.Portal.entity.Student;
import com.vaccation.Portal.entity.VaccinationRecord;

public interface VaccinationRecordRepository extends JpaRepository<VaccinationRecord, Long> {

   // boolean existsByStudentIdAndVaccineNameAndDriveId(Long studentId, String vaccineName, String driveId);
	boolean existsByStudentAndVaccineNameAndDriveId(Student student, String vaccineName, String driveId);


	 List<VaccinationRecord> findByStudent(Student student);
}
