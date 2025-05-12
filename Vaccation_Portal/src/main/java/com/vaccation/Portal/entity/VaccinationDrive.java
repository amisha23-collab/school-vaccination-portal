package com.vaccation.Portal.entity;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "VaccinationDrive")
public class VaccinationDrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Vaccine name is required")
    private String vaccineName;

    @NotNull(message = "Drive date is required")
    private LocalDate date;

    @Min(value = 1, message = "Available doses must be at least 1")
    private int availableDoses;

    @Convert(converter = StringListConverter.class)
    private List<String> applicableClasses;

    //@Enumerated(EnumType.STRING)
    private DriveStatus status = DriveStatus.ACTIVE;
    
    

    public Long getId() {
		return id;
	}



	public void setId(Long id) {
		this.id = id;
	}



	public String getVaccineName() {
		return vaccineName;
	}



	public void setVaccineName(String vaccineName) {
		this.vaccineName = vaccineName;
	}



	public LocalDate getDate() {
		return date;
	}



	public void setDate(LocalDate date) {
		this.date = date;
	}



	public int getAvailableDoses() {
		return availableDoses;
	}



	public void setAvailableDoses(int availableDoses) {
		this.availableDoses = availableDoses;
	}



	public List<String> getApplicableClasses() {
		return applicableClasses;
	}



	public void setApplicableClasses(List<String> applicableClasses) {
		this.applicableClasses = applicableClasses;
	}



	public DriveStatus getStatus() {
		return status;
	}



	public void setStatus(DriveStatus status) {
		this.status = status;
	}



	public void setStatusBasedOnDate() {
        if (date.isBefore(LocalDate.now())) {
            status = DriveStatus.COMPLETED;
        }
    }
}
