package com.vaccation.Portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vaccation.Portal.dto.ResponseDTO;
import com.vaccation.Portal.entity.VaccinationDrive;
import com.vaccation.Portal.exceptions.ResourceNotFoundException;
import com.vaccation.Portal.service.VaccinationDriveService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('Admin')")
public class VaccinationDriveController {

    @Autowired
    private VaccinationDriveService vaccinationDriveService;

    // Create a vaccination drive
    @PostMapping
    public ResponseEntity<ResponseDTO<VaccinationDrive>> createDrive(@Valid @RequestBody VaccinationDrive drive) {
        try {
            vaccinationDriveService.createDrive(drive);
            return ResponseEntity.ok(new ResponseDTO<>("success", "Vaccination drive created successfully", drive));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO<>("error", "Failed to create vaccination drive: " + e.getMessage(), null));
        }
    }

 // Get a single vaccination drive by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResponseDTO<VaccinationDrive>> getDriveById(@PathVariable("id") Long id) {
        try {
            VaccinationDrive drive = vaccinationDriveService.getDriveById(id);
            return ResponseEntity.ok(new ResponseDTO<>("success", "Vaccination drive retrieved successfully", drive));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseDTO<>("error", "Vaccination drive not found", null));
        }
    }

    // Update an existing vaccination drive
    @PutMapping("/{id}")
    public ResponseEntity<ResponseDTO<VaccinationDrive>> updateDrive(@PathVariable("id") Long id, @Valid @RequestBody VaccinationDrive drive) {
        try {
            VaccinationDrive updatedDrive = vaccinationDriveService.updateDrive(id, drive);
            return ResponseEntity.ok(new ResponseDTO<>("success", "Vaccination drive updated successfully", updatedDrive));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ResponseDTO<>("error", "Failed to update vaccination drive: " + e.getMessage(), null));
        }
    }

 // Get all vaccination drives with pagination
    @GetMapping
    public ResponseEntity<ResponseDTO<Page<VaccinationDrive>>> getAllDrives(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        Page<VaccinationDrive> drives = vaccinationDriveService.getAllDrivesWithPagination(PageRequest.of(page, size));
        if (drives.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body(new ResponseDTO<>("error", "No vaccination drives found", null));
        }
        return ResponseEntity.ok(new ResponseDTO<>("success", "Vaccination drives retrieved successfully", drives));
    }

}
