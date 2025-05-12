package com.vaccation.Portal.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vaccation.Portal.dto.DashboardDTO;
import com.vaccation.Portal.entity.VaccinationDrive;
import com.vaccation.Portal.repository.StudentRepository;
import com.vaccation.Portal.repository.VaccinationDriveRepository;

@RestController
@RequestMapping("/admin/api")
public class DashboardController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private VaccinationDriveRepository vaccinationDriveRepository;

    @GetMapping("/dashboard")
    public DashboardDTO getDashboardOverview() {
        long totalStudents = studentRepository.count();
        long vaccinatedStudents = studentRepository.countByVaccinatedStatus("Done");
        double vaccinationPercentage = (double) vaccinatedStudents / totalStudents * 100;

        LocalDate today = LocalDate.now();
        LocalDate next30Days = today.plusDays(30);
        List<VaccinationDrive> upcomingDrives = vaccinationDriveRepository.findUpcomingDrives(today, next30Days);

        return new DashboardDTO(totalStudents, vaccinatedStudents, vaccinationPercentage, upcomingDrives);
    }

}
