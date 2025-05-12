package com.vaccation.Portal.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vaccation.Portal.entity.VaccinationDrive;

public interface VaccinationDriveRepository extends JpaRepository<VaccinationDrive, Long> {

    @Query("SELECT v FROM VaccinationDrive v WHERE v.date BETWEEN :startDate AND :endDate")
    List<VaccinationDrive> findUpcomingDrives(@Param("startDate") LocalDate startDate, 
                                               @Param("endDate") LocalDate endDate);

    boolean existsByDateBetween(LocalDate startDate, LocalDate endDate);

    Page<VaccinationDrive> findAll(Pageable pageable);
}
