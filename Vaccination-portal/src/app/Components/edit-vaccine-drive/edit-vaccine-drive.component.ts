import { Component, Inject, OnInit } from '@angular/core';
import { VaccinationDrive } from '../../Models/vaccine-drive.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationDriveService } from '../../Services/vaccination-drive.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-vaccine-drive',
  imports: [FormsModule,CommonModule],
  templateUrl: './edit-vaccine-drive.component.html',
  styleUrls: ['./edit-vaccine-drive.component.css']
})
export class EditVaccineDriveComponent implements OnInit {
  drive: VaccinationDrive = {
    id: 0,
    vaccineName: '',
    date: '',
    availableDoses: 0,
    applicableClasses: [],
    status: 'ACTIVE'  // Always set to ACTIVE by default
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
  private route: ActivatedRoute,
  private router: Router,
  private vaccinationDriveService: VaccinationDriveService,
  public dialogRef: MatDialogRef<EditVaccineDriveComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
) {}


 ngOnInit(): void {
  const driveId = this.data.id;
  if (driveId !== undefined && driveId !== null) {
    this.drive.id = driveId;
    this.vaccinationDriveService.getVaccinationDriveById(driveId).subscribe(
      (drive) => {
        this.drive = { ...drive, id: driveId };
      },
      (error) => {
        this.errorMessage = 'Failed to load drive details.';
        console.error('Error loading drive:', error);
      }
    );
  } else {
    this.errorMessage = 'Invalid drive ID.';
    console.error('Drive ID is missing or invalid.');
  }
}



 updateDrive() {
    if (!this.drive.id) {
        this.errorMessage = 'Drive ID is missing. Cannot update the drive.';
        return;
    }

    // Convert date to proper format
    const dateObj = new Date(this.drive.date);
    if (dateObj instanceof Date && !isNaN(dateObj.getTime())) {
        this.drive.date = dateObj.toISOString().split("T")[0];
    }

    // Convert applicableClasses to array if it is a string
    if (typeof this.drive.applicableClasses === 'string') {
        this.drive.applicableClasses = this.drive.applicableClasses.split(',').map((cls: string) => cls.trim());
    }

    this.vaccinationDriveService.updateVaccinationDrive(this.drive.id, this.drive).subscribe(
      (response) => {
        this.successMessage = 'Vaccination drive updated successfully!';
        setTimeout(() => this.router.navigate(['/vaccine-drives']), 1500);
        console.log(response)
      },
      (error) => {
        this.errorMessage = 'Failed to update vaccination drive.';
      }
    );
}

}
