package com.vaccation.Portal.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vaccation.Portal.entity.VaccinationDrive;
import com.vaccation.Portal.entity.DriveStatus;
import com.vaccation.Portal.exceptions.InvalidScheduleException;
import com.vaccation.Portal.exceptions.ResourceNotFoundException;
import com.vaccation.Portal.exceptions.SchedulingConflictException;
import com.vaccation.Portal.repository.VaccinationDriveRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VaccinationDriveService {

    @Autowired
    private VaccinationDriveRepository vaccinationDriveRepository;

    public void createDrive(VaccinationDrive drive) {
        if (!isDriveScheduledInAdvance(drive)) {
            throw new InvalidScheduleException("Vaccination drive must be scheduled at least 15 days in advance.");
        }
        validateDriveSchedule(drive);
        vaccinationDriveRepository.save(drive);
    }

    public VaccinationDrive getDriveById(Long id) {
        return vaccinationDriveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccination Drive not found"));
    }

    public VaccinationDrive updateDrive(Long id, VaccinationDrive drive) {
        VaccinationDrive existingDrive = vaccinationDriveRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaccination Drive not found"));

        if (!isDriveScheduledInAdvance(drive)) {
            throw new InvalidScheduleException("Vaccination drive must be scheduled at least 15 days in advance.");
        }

        validateDriveSchedule(drive);

        existingDrive.setDate(drive.getDate());
        existingDrive.setVaccineName(drive.getVaccineName());
        existingDrive.setAvailableDoses(drive.getAvailableDoses());
        existingDrive.setApplicableClasses(drive.getApplicableClasses());

        // Update status if provided
        if (drive.getStatus() != null) {
            existingDrive.setStatus(drive.getStatus());
        } else {
            existingDrive.setStatusBasedOnDate(); // Auto-complete status if date is past
        }

        return vaccinationDriveRepository.save(existingDrive);
    }


    public List<VaccinationDrive> getAllDrives() {
        return vaccinationDriveRepository.findAll();
    }

    public Page<VaccinationDrive> getAllDrivesWithPagination(Pageable pageable) {
        return vaccinationDriveRepository.findAll(pageable);
    }

    public boolean isDriveScheduledInAdvance(VaccinationDrive drive) {
        return !drive.getDate().isBefore(LocalDate.now().plusDays(15));
    }

    public void validateDriveSchedule(VaccinationDrive drive) {
        LocalDate startDate = drive.getDate();
        LocalDate endDate = startDate.plusDays(1);

        boolean conflictExists = vaccinationDriveRepository.existsByDateBetween(startDate, endDate);
        if (conflictExists) {
            throw new SchedulingConflictException("There is already a vaccination drive scheduled on this date.");
        }
    }
}
