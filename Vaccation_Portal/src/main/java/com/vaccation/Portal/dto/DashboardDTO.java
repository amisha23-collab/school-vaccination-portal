package com.vaccation.Portal.dto;

import java.util.List;

import com.vaccation.Portal.entity.VaccinationDrive;

public class DashboardDTO {
    private long totalStudents;
    private long vaccinatedStudents;
    private double vaccinationPercentage;
    private List<VaccinationDrive> upcomingDrives;

    // Constructor, getters and setters
    public DashboardDTO(long totalStudents, long vaccinatedStudents, double vaccinationPercentage, List<VaccinationDrive> upcomingDrives) {
        this.totalStudents = totalStudents;
        this.vaccinatedStudents = vaccinatedStudents;
        this.vaccinationPercentage = vaccinationPercentage;
        this.upcomingDrives = upcomingDrives;
    }

	public long getTotalStudents() {
		return totalStudents;
	}

	public void setTotalStudents(long totalStudents) {
		this.totalStudents = totalStudents;
	}

	public long getVaccinatedStudents() {
		return vaccinatedStudents;
	}

	public void setVaccinatedStudents(long vaccinatedStudents) {
		this.vaccinatedStudents = vaccinatedStudents;
	}

	public double getVaccinationPercentage() {
		return vaccinationPercentage;
	}

	public void setVaccinationPercentage(double vaccinationPercentage) {
		this.vaccinationPercentage = vaccinationPercentage;
	}

	public List<VaccinationDrive> getUpcomingDrives() {
		return upcomingDrives;
	}

	public void setUpcomingDrives(List<VaccinationDrive> upcomingDrives) {
		this.upcomingDrives = upcomingDrives;
	}

   
}
